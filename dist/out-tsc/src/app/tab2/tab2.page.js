var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TodoServiceProvider } from '../todo.service';
import { NavController } from '@ionic/angular';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(todoservice, navCtrl) {
        this.todoservice = todoservice;
        this.navCtrl = navCtrl;
    }
    Tab2Page.prototype.ngOnInit = function () {
        var _this = this;
        this.todoservice.getList().subscribe(function (lists) { return _this.lists = lists; });
    };
    Tab2Page.prototype.openList = function (uuid) {
        console.log(uuid);
        this.navCtrl.navigateForward("list/" + uuid);
    };
    Tab2Page.prototype.getNumberOfElements = function (uuid) {
        var n;
        this.todoservice.getTodos(uuid).subscribe(function (list) { return n = list.length; });
        return n;
    };
    Tab2Page = __decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        __metadata("design:paramtypes", [TodoServiceProvider, NavController])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map