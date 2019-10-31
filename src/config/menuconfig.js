
const MenuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的 path
        icon: 'home', // 图标名称
    },
    {
        title: ' 订单管理', // 菜单标题名称
        key: '/order', // 对应的 path
        icon: 'home', // 图标名称
    },
    {
        title: ' 仓库管理',
        key: '/warehouse',
        icon: 'warehouse',
        // children:[
        //     {
        //         title: ' 采购进货',
        //         key: '/inhouse',
        //         icon: 'warehouse',
        //     },
        //     {
        //         title: ' 采购进货',
        //         key: '/outhouse',
        //         icon: 'warehouse',
        //     }
        // ]
    },
    {
        title: '销售记录',
        key: '/sell',
        icon: 'sell',
    },
    {
        title: '报表查询',
        key: '/charts',
        icon: 'charts',
        // children: [
        //     {
        //         title: ' 柱形图',
        //         key: '/charts/bar',
        //         icon: 'bar-chart'
        //     },
        //     {
        //         title: ' 折线图',
        //         key: '/charts/line',
        //         icon: 'line-chart'
        //     },
        //     {
        //         title: ' 饼图',
        //         key: '/charts/pie',
        //         icon: 'pie-chart'
        //     },
        // ]
    },
    {
      title:'用户管理',
        key:'/user',
        icon:'user',
    },
]

export default MenuList;