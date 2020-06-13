import('../../../wasm/pkg/calm_focus_wasm')
  .then((results) => {
    console.log(results)
    console.log(results.add(2, 2))
    self.addEventListener('message', (ev) => {
      console.log('message', ev)
    })
  })
  .catch((error) => console.error(error))
