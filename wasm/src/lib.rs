// mod utils;

// use wasm_bindgen::prelude::*;

// // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// // allocator.
// #[cfg(feature = "wee_alloc")]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern "C" {
//   fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet() {
//   alert("Hello, wasm-game-of-life!");
// }

// use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
// extern "C" {
//   fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet(name: &str) {
//   alert(&format!("Hello, {}!", name));
//   return 7
// }

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
  a + b
}
