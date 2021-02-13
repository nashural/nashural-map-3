const fs = require('fs')
const { features } = require('process')

const swapCoordinates = (coordinates) => {
  return [coordinates[1], coordinates[0]]
}

const updateFile = (path, featureId, coordinates) => {
  const data = JSON.parse(fs.readFileSync(path), { encoding: 'utf-8' })

  for (let i=0; i<data.features.length; i++) {
    const feature = data.features[i]
    if (feature.id === featureId) {
      const newFeature = {
        ...feature,
        geometry: {
          ...feature.geometry,
          coordinates
        }
      }
      data.features.splice(i, 1, newFeature)
      fs.writeFileSync(path, JSON.stringify(data, null, 2), { encoding: 'utf-8' })
    }
  }
}

const { groups } = JSON.parse(fs.readFileSync('public/data.bak/groups.json', { encoding: 'utf-8' }))

for (let { id: groupId } of groups) {
  const { features } = JSON.parse(fs.readFileSync(`public/data.bak/${groupId}.json`, { encoding: 'utf-8' }))

  for (let { id, geometry: { coordinates } } of features) {
    updateFile(`public/data/${groupId}.json`, id, swapCoordinates(coordinates))
  }
}
