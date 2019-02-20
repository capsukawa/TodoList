var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import 'rxjs/Rx';
var TodoServiceProvider = /** @class */ (function () {
    function TodoServiceProvider() {
        this.data = [
            {
                uuid: 'a351e558-29ce-4689-943c-c3e97be0df8b',
                name: 'List 1',
                items: [
                    {
                        uuid: '7dc94eb4-d4e9-441b-b06b-0ca29738c8d2',
                        name: 'Item 1-1',
                        complete: false,
                        desc: 'je suis sans famille et je m appelle remi et je me balade dans la vie'
                    },
                    {
                        uuid: '20c09bdd-1cf8-43b0-9111-977fc4d343bc',
                        name: 'Item 1-2',
                        complete: false
                    },
                    {
                        uuid: 'bef88351-f4f1-4b6a-965d-bb1a4fa3b444',
                        name: 'Item 1-3',
                        complete: true
                    }
                ]
            },
            { uuid: '90c04913-c1a2-47e5-9535-c7a430cdcf9c',
                name: 'List 2',
                items: [
                    {
                        uuid: '72849f5f-2ef6-444b-98b0-b50fc019f97c',
                        name: 'Item 2-1',
                        complete: false
                    },
                    {
                        uuid: '80d4cbbe-1c64-4603-8d00-ee4932045333',
                        name: 'Item 2-2',
                        complete: true
                    },
                    {
                        uuid: 'a1cd4568-590b-428b-989d-165f22365485',
                        name: 'Item 2-3',
                        complete: true
                    }
                ]
            }
        ];
        console.log('Hello TodoServiceProvider Provider');
    }
    TodoServiceProvider.prototype.getList = function () {
        return of(this.data);
    };
    TodoServiceProvider.prototype.getListName = function (uuid) {
        return of(this.data.find(function (d) { return d.uuid === uuid; }).name);
    };
    TodoServiceProvider.prototype.getTodos = function (uuid) {
        return of(this.data.find(function (d) { return d.uuid === uuid; }).items);
    };
    TodoServiceProvider.prototype.editTodo = function (listUuid, editedItem) {
        var items = this.data.find(function (d) { return d.uuid === listUuid; }).items;
        var index = items.findIndex(function (value) { return value.uuid === editedItem.uuid; });
        items[index] = editedItem;
    };
    TodoServiceProvider.prototype.deleteTodo = function (listUuid, uuid) {
        var items = this.data.find(function (d) { return d.uuid === listUuid; }).items;
        var index = items.findIndex(function (value) { return value.uuid === uuid; });
        if (index !== -1) {
            items.splice(index, 1);
        }
    };
    TodoServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], TodoServiceProvider);
    return TodoServiceProvider;
}());
export { TodoServiceProvider };
//# sourceMappingURL=todo.service.js.map