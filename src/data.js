const data = [
  {
    name: 'Project 1',
    description: 'Project 1 Description',
    items: [
      { name: 'Subitem 1', price: 7 },
      { name: 'Subitem 2', price: 6 },
      { name: 'Subitem 3', price: 6 }
    ]
  }
]

const dataMap = data.reduce(function (map, category) {
  category.itemsMap = category.items.reduce(function (itemsMap, item) {
    itemsMap[item.name] = item
    return itemsMap
  }, {})
  map[category.name] = category
  return map
}, {})

exports.getAll = function () {
  return data
}

exports.lookupCategory = function (name) {
  return dataMap[name]
}

exports.lookupItem = function (category, item) {
  return dataMap[category].itemsMap[item]
}
