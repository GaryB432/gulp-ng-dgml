
declare module 'angular-architecture-graph' {

    interface IFile {
        id: string;
        text: string;
    }
    interface IArchitectureGraph {
        angular: IAngular;
        results: any[];
    }
    interface IAngular {
        modules: IModule[];
        modulesMap: any;
    }
    interface IModuleItem {
        name: string;
        deps: any[];
    }
    interface IModule {
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
    function xmls(input?: IFile[], options?: any): IArchitectureGraph;
    export = xmls;
}
