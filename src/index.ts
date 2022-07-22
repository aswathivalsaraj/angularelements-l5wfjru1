import "core-js/proposals/reflect-metadata";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement } from "@angular/elements";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgModule, Injector, Inject } from "@angular/core";
import MyCounter from "./my-counter.js";

@NgModule({
  imports: [BrowserModule],
  declarations: [MyCounter],
  providers: [],
  entryComponents: [MyCounter]
})
class AppModule {
  constructor(@Inject(Injector) private injector: Injector) {}
  ngDoBootstrap() {
    customElements.define(
      "my-counter",
      createCustomElement(MyCounter, {
        injector: this.injector
      })
    );
  }
}
platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: "noop" });
