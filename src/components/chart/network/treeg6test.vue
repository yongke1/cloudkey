<template>
  <div id="mountNode"></div>
</template>
<script>
import G6 from '@antv/g6';
export default {
  name: "treeg6test",
  data () {
    return {

    }
  },
  methods: {
    init6 () {
      G6.registerEdge('VHV', {
        getPath (item) {
          const points = item.getPoints();
          const start = points[0];
          const end = points[points.length - 1];
          const vgap = end.y - start.y;
          const ygap = vgap / 4 * 3;
          return [
            ['M', start.x, start.y],
            ['L', start.x, start.y + ygap],
            ['L', end.x, start.y + ygap],
            ['L', end.x, end.y]
          ];
        }
      });

      G6.registerNode('card', {
        collapseButtonUrl: 'https://gw.alipayobjects.com/zos/rmsportal/GGzWwlTjflbJHmXhjMXg.svg',
        expandButtonUrl: 'https://gw.alipayobjects.com/zos/rmsportal/DzWdTiwanggjaWKwcnWZ.svg',
        draw (item) {
          const group = item.getGraphicGroup();
          const { main, value, percent, collapsed, children } = item.getModel();
          const width = 170;
          const height = 80;
          const buttonWidth = 14;
          const buttonHeight = 14;
          let button = '';
          if (children && children.length > 0) {
            button = '<img class="ce-button" src=' + (collapsed ? this.expandButtonUrl : this.collapseButtonUrl) + '>';
          }

          const html = G6.Util.createDOM(`
      <div class="card-container">
        <h1 class="main-text">${main}</h1>
        <p>
          <span class="value-text">${value}</span>
          <span class="percent-text">${percent}</span>
        </p>
      </div>
    `);
          const keyShape = group.addShape('dom', {
            attrs: {
              x: 0,
              y: 0,
              width,
              height,
              html
            }
          });
          group.addShape('dom', {
            attrs: {
              x: width / 2 - buttonWidth / 2,
              y: height - buttonHeight,
              width: buttonWidth,
              height: buttonHeight,
              html: button
            }
          });
          return keyShape;
        },
        anchor: [
          [0.5, 0],
          [0.5, 1]
        ]
      });
      const data = {
        roots: [{
          main: '主指标一',
          value: 123111,
          percent: '100%',
          type: 'a',
          children: [{
            main: '指标 1',
            value: 12312,
            percent: '39%',
            type: 'b',
            children: [
              {
                main: '指标 1.1',
                value: 111,
                percent: '90%',
                type: 'a',
              }
            ]
          }, {
            main: '指标 2',
            value: 12312,
            percent: '79%',
            type: 'b',
            children: [
              {
                main: '指标 2.1',
                value: 111,
                percent: '90%',
                type: 'a',
              },
              {
                main: '指标 2.2',
                value: 222,
                percent: '90%',
                type: 'a',
              }
            ]
          }]
        }]
      };
      const tree = new G6.Tree({
        container: 'mountNode',
        height: 500,
        renderer: 'svg',
        layout: new G6.Layouts.CompactBoxTree({
          // direction: 'LR', // 方向（LR/RL/H/TB/BT/V）
          getHGap: function getHGap () /* d */ {
            // 横向间距
            return 80;
          },
          getVGap: function getVGap () /* d */ {
            // 竖向间距
            return 24;
          },
          direction: 'TB'
        }),
        fitView: 'tc'
      });
      tree.node({
        shape: 'card'
      });
      tree.edge({
        shape: 'VHV'
      });
      tree.on('node:click', ev => {
        const { domEvent, item } = ev;
        const { target } = domEvent;
        const { collapsed } = item.getModel();
        if (target.className === 'ce-button') {
          if (collapsed) {
            tree.update(item, {
              collapsed: false,
            });
          } else {
            tree.update(item, {
              collapsed: true,
            });
          }
        }
      });
      tree.read(data);
    }
  },
  mounted () {
    this.init6();
  }
}
</script>
<style lang="scss" scoped>
.card-container {
  width: 170px;
  height: 74px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}
.ce-button:hover {
  cursor: pointer;
}
.card-container .main-text {
  text-align: center;
  margin: 12px 14px;
  padding-bottom: 8px;
  margin-bottom: 0px;
  font-size: 16px;
  border-bottom: 1px solid #dbdbdb;
}
.card-container p {
  font-size: 12px;
  margin: 8px;
}
.card-container .value-text {
  margin-left: 12px;
  text-align: left;
}
.card-container .percent-text {
  margin-right: 12px;
  float: right;
  color: red;
}
</style>