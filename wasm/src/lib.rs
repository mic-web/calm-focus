extern crate console_error_panic_hook;
use wasm_bindgen::prelude::*;

type Seconds = u32;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
  (
    $( $t:tt )* ) => {
      web_sys::console::log_1(&format!( $( $t )* ).into());
  }
}

#[wasm_bindgen]
// pub fn start(f: fn(Seconds) -> ()) {
pub fn tick(seconds_passed: Seconds) -> Seconds {
  console_error_panic_hook::set_once();
  log!("Tick");
  seconds_passed + 1
}
