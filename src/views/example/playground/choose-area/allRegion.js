export default `[
  {
    regionid: 110001,
    name: '北京',
    parentId: -1,
    level: 1
  },
  {
    regionid: 120001,
    name: '天津',
    parentId: -1,
    level: 1
  },
  {
    regionid: 130000,
    name: '河北省',
    parentId: -1,
    level: 1
  },
  {
    regionid: 110000,
    name: '北京市',
    parentId: 110001,
    level: 2
  },
  {
    regionid: 130100,
    name: '石家庄市',
    parentId: 130000,
    level: 2
  },
  {
    regionid: 130400,
    name: '邯郸市',
    parentId: 130000,
    spell: '河北省-邯郸市',
    level: 2
  },
  {
    regionid: 130102,
    name: '长安区',
    parentId: 130100,
    spell: '河北省-石家庄市-长安区',
    level: 3
  },
  {
    regionid: 130104,
    name: '桥西区',
    parentId: 130100,
    spell: '河北省-石家庄市-桥西区',
    level: 3
  }
]`
