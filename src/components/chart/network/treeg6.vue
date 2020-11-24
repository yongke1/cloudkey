<template>
  <div id="container"></div>
</template>
<script>
import G6 from '@antv/g6';
export default {
  name: "treeg6",
  data () {
    return {
      treelist: {
        "id": "Modeling Methods",
        "children": [
          {
            "id": "Classification",
            "children": [
              {
                "id": "Logistic regression",
                "children": [
                  { "id": "1" },
                  { "id": "2" },
                  { "id": "3" }
                ]
              },
              {
                "id": "Linear discriminant analysis",
                "children": [
                  { "id": "1.1" },
                  { "id": "2.1" },
                  { "id": "3.1" }
                ]
              },
              {
                "id": "Rules",
                "children": [
                  { "id": "1.2" }
                ]
              },
            ]
          }
        ],
      }

    }
  },
  methods: {
    initG6 () {

      const width = document.getElementById('container').scrollWidth || 800;
      const height = document.getElementById('container').scrollHeight || 800;
      const tree = new G6.TreeGraph({
        renderer: 'svg',
        container: 'container',
        width,
        height,
        modes: {
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange (item, collapsed) {
                console.log(item)
                const data = item.get('model').data;
                data.collapsed = collapsed;
                return true;
              },
            },
            'drag-canvas',
            'zoom-canvas',
          ],
        },
        defaultNode: {           //节点样式
          type: 'dom-node',
          style: {
            fill: '#C6E5FF',      //节点内部颜色
            stroke: 'green',      //节点border颜色
          },
        },
        defaultEdge: {             //连接线样式
          type: 'cubic-horizontal',
          style: {
            stroke: 'green',
          },
        },
        layout: {
          type: 'compactBox',   // 布局类型
          direction: 'LR',      // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
          getId: function getId (d) {
            return d.id;
          },
          getHeight: function getHeight () {
            return 16;
          },
          getWidth: function getWidth () {
            return 16;
          },
          getVGap: function getVGap () {
            return 20;
          },
          getHGap: function getHGap () {
            return 100;
          },
        },

      });
      G6.registerNode('dom-node', {
        draw: (cfg, group) => {
          const shape = group.addShape('dom', {
            attrs: {
              width: 50,
              height: 50,
              // 传入 DOM 的 html，带有原生 onclick 事件
              html: `
        <div οnclick="alert('Hi')" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: 50px; height: 50px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `
            },
            draggable: true
          });
          return shape
        },
      });



      // G6.registerNode('rectNode', {
      //   draw: (cfg, group) => {
      //     //最外面的那层
      //     const shape = group.addShape('rect', {
      //       draggable: true,
      //       attrs: {
      //         x: 0,
      //         y: 0,
      //         width: 125,
      //         height: 40,
      //         fill: cfg.style.fill, //填充色
      //         stroke: '', //边框
      //         radius: 8,
      //       },
      //     });
      //     //里面的那层
      //     group.addShape('rect', {
      //       draggable: true,
      //       attrs: {
      //         x: 5,
      //         y: 0,
      //         width: 120,
      //         height: 40,
      //         fill: '#fff', //填充色
      //         stroke: '', //边框
      //         radius: 6,
      //       },
      //     });
      //     //文字
      //     group.addShape('text', {
      //       attrs: {
      //         // textBaseline: 'center',
      //         y: 25,
      //         x: 24,
      //         lineHeight: 10,
      //         text: cfg.label,
      //         fill: '#000',
      //       },
      //     });
      //     return shape;
      //   },
      // });

      tree.node(function (node) {
        return {
          label: node.id,
          labelCfg: {
            offset: 10,
            position: 'bottom',
          },
        };
      });
      tree.read(this.treelist)
    }
  },
  mounted () {
    this.initG6()
  }
}
</script>
<style lang="scss" scoped>
</style>