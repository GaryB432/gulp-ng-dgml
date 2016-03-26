/// <reference path="typings/tsd.d.ts" />
import mocha = require("mocha");
import dgml = require("ts-dgml");

namespace angularToDgml {
    export namespace IAngularGraph {
        export interface IAngular {
            modules: IModule[];
            modulesMap: any;
        }
        export interface IModuleItem {
            name: string;
            deps: string[];
        }
        export interface IModule {
            name: string;
            items: string[];
            controllers: IModuleItem[];
            services: IModuleItem[];
            factories: IModuleItem[];
            filters: IModuleItem[];
            providers: IModuleItem[];
            directives: IModuleItem[];
            modules: string[];
        }
    }

    interface HashTable<T> {
        [key: string]: T;
    }

    export interface IAddToGraphOptions {
        colors: ICategoryColors;
    }

    export interface ICategoryColors {
        modules?: string;
        controllers?: string;
        services?: string;
        factories?: string;
        filters?: string;
        providers?: string;
        directives?: string;
        externals?: string;
    }

    export class DgmlHelper {
        static addToDirectedGraph(ng: IAngularGraph.IAngular, dg: dgml.DirectedGraph, options?: IAddToGraphOptions) {
            if (options === void 0) {
                options = {
                    colors: {
                        controllers: "#FFFF0000",
                        services: "#FF0000FF",
                        factories: "#FFFFA500",
                        filters: "#FFFFC0CB",
                        providers: "#FF7FFF00",
                        directives: "#FF008000",
                        externals: "#FF808000"
                    }
                };
            }

            function addFeature(item: HashTable<IAngularGraph.IModuleItem>, nmodule: IAngularGraph.IModule, category: string) {

                for (let s in item) {
                    dg.nodes.push(new dgml.Node(s, s, category));
                    dg.links.push(new dgml.Link(nmodule.name, s));

                    item[s].deps.forEach(d => {
                        dg.links.push(new dgml.Link(s, d));
                    });
                }
            }

            ng.modules.forEach((nmodule) => {

                let controllers: HashTable<IAngularGraph.IModuleItem> = {},
                    services: HashTable<IAngularGraph.IModuleItem> = {},
                    factories: HashTable<IAngularGraph.IModuleItem> = {},
                    filters: HashTable<IAngularGraph.IModuleItem> = {},
                    providers: HashTable<IAngularGraph.IModuleItem> = {},
                    directives: HashTable<IAngularGraph.IModuleItem> = {};

                nmodule.controllers.forEach(s => controllers[s.name] = s);
                nmodule.services.forEach(s => services[s.name] = s);
                nmodule.factories.forEach(s => factories[s.name] = s);
                nmodule.filters.forEach(s => filters[s.name] = s);
                nmodule.providers.forEach(s => providers[s.name] = s);
                nmodule.directives.forEach(s => directives[s.name] = s);

                if (nmodule.modules !== void 0) {
                    nmodule.modules.forEach(cm => {
                        dg.nodes.push(new dgml.Node(cm, cm, "Module"));
                        dg.links.push(new dgml.Link(nmodule.name, cm));
                    });
                }

                dg.nodes.push(new dgml.Node(nmodule.name, nmodule.name, "Module"));

                addFeature(controllers, nmodule, "Controller");
                addFeature(services, nmodule, "Service");
                addFeature(factories, nmodule, "Factory");
                addFeature(filters, nmodule, "Filter");
                addFeature(providers, nmodule, "Provider");
                addFeature(directives, nmodule, "Directive");
            });

            let cats: any[] = [
                ["Module", options.colors.modules],
                ["Controller", options.colors.controllers],
                ["Service", options.colors.services],
                ["Factory", options.colors.factories],
                ["Filter", options.colors.filters],
                ["Provider", options.colors.providers],
                ["Directive", options.colors.directives],
                ["External", options.colors.externals]
            ];

            dg.categories = cats.map(cat => new dgml.Category(cat[0], cat[0], { Background: cat[1] }));

            dg.addExternalNodes("External");
        }
    }
}
export = angularToDgml;
