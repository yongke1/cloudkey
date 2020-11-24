<style lang="scss" scoped>
.padding {
  padding: 20px;
  text-align: right;
  .pagination {
    display: inline-block;
    user-select: none;
    .total {
      height: 32px;
      line-height: 32px;
      background: #fff;
      border: none;
      color: rgba(0, 0, 0, 0.25);
      font-size: 14px;
      &:hover,
      &.active {
        color: rgba(0, 0, 0, 0.25);
        background: #fff;
        border: none;
      }
    }
    li {
      border: 1px solid #e9edf8;
      border-radius: 4px;
      background: #e9edf8;
      float: left;
      margin: 0 5px;
      a {
        display: block;
        text-align: center;
        width: 32px;
        font-size: 12px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.5);
        background: #fff;
        border-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }
      &.disabled:hover {
        a {
          cursor: not-allowed;
          color: #419eff;
          i {
            color: #419eff;
          }
        }
      }
      &:hover,
      &.active {
        background: #fff;
        border-color: #419eff;
        a {
          color: #419eff;
          i {
            color: #419eff;
          }
        }
      }
      &:active {
        background: #fff;
        border-color: #419eff;
        color: #419eff;
      }
    }
  }
}

.icon-pre {
  position: relative;
  left: -1px;
  color: #97a1ac;
}

.icon-next {
  position: relative;
  left: 1px;
  color: #97a1ac;
}
a {
  text-decoration: none;
}
.clearfix {
  margin-top: 0;
}
li {
  list-style: none;
}
</style>

<template>
  <div class="padding clearfix">
    <ul class="pagination">
      <li class="total"
          v-show="totalElement">
        <span>共{{totalElement}}条</span>
      </li>
      <li class="first"
          :class="{'disabled': internalCurrentPage == 1}">
        <a href="javascript:void(0)"
           @click="go(1)"><i class="el-icon-d-arrow-left"></i></a>
      </li>
      <li v-show="hasPrevious">
        <a href="javascript:void(0)"
           @click="prev()"><i class="el-icon-arrow-left icon-pre"></i></a>
      </li>
      <li :class="{'active': internalCurrentPage == i}"
          v-for="(i, index) in pages"
          :key="index">
        <a href="javascript:void(0)"
           @click="go(i)">{{i}}</a>
      </li>
      <li v-show="hasNextVar">
        <a href="javascript:void(0)"
           @click="next()"><i class="el-icon-arrow-right icon-next"></i></a>
      </li>
      <li class="end"
          :class="{'disabled': internalCurrentPage == totalPage}">
        <a href="javascript:void(0)"
           @click="go(totalPage)"><i class="el-icon-d-arrow-right"></i></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'hyPage',
  data () {
    return {
      internalCurrentPage: 1
    };
  },
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 展示多少
    showItem: {
      type: Number,
      default: 5
    },
    limit: {
      type: Number,
      default: 10
    },
    totalElement: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPage: function () {
      return Math.ceil(this.totalElement / this.limit);
    },
    pages: function () {
      let pages = [];
      if (this.internalCurrentPage < this.showItem) {
        let i = Math.min(this.showItem, this.totalPage);
        while (i) {
          pages.unshift(i--);
        }
      } else {
        let middle = this.internalCurrentPage - Math.floor(this.showItem / 2);
        let i = this.showItem;
        let calc = this.totalPage - this.showItem;
        if (middle > calc) {
          middle = calc + 1;
        }
        while (i--) {
          pages.push(middle++);
        }
      }
      return pages;
    },
    hasPrevious: function () {
      return this.internalCurrentPage > 1;
    },
    hasNextVar: function () {
      return this.internalCurrentPage < this.totalPage;
    }
  },
  methods: {
    next () {
      if (this.hasNextVar) {
        this.internalCurrentPage++;
        this.load();
      }
    },
    go (currentPage) {
      if (this.internalCurrentPage === currentPage) return;
      this.internalCurrentPage = currentPage;
      this.load();
    },
    prev () {
      if (this.hasPrevious) {
        this.internalCurrentPage--;
        this.load();
      }
    },
    load () {
      this.$emit('current-change', this.internalCurrentPage);
    }
  },
  watch: {
    'currentPage': {
      immediate: true,
      handler (val) {
        this.internalCurrentPage = val;
      }
    }
  }
};
</script>
