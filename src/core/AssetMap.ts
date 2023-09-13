import { Font, Image } from "love.graphics";

export type Love2DAsset = Image | Font

export class AssetMap {
    static assetsIdMap: { [key: string]: string } = {};
    static assetObjects: { [key: string]: Love2DAsset } = {};

    static addAsset(key: string, assetPath: string) {
        AssetMap.assetsIdMap[key] = assetPath;
    }

    static getAsset(key: string): string | null {
        if(AssetMap.assetsIdMap[key] == undefined) {
            return null;
        }
        return AssetMap.assetsIdMap[key];
    }
    
    static loadImage(key: string): Image {
        const assetPath = AssetMap.getAsset(key);
        if(assetPath == null) {
            throw new Error("Asset not found: " + key);
        }

        let asset = AssetMap.assetObjects[key];
        if(asset == undefined) {
            this.preloadImage(key);
        }

        return AssetMap.assetObjects[key] as Image;
    }

    static loadFont(key: string): Font {
        let asset = AssetMap.assetObjects[key];
        if(asset == undefined) {
            throw new Error("Asset not found: " + key);
        }

        return AssetMap.assetObjects[key] as Font;
    }

    static preloadFont(key: string, size: number){
        const assetPath = AssetMap.getAsset(key);
        if(assetPath == null) {
            throw new Error("Asset not found: " + key);
        }

        let asset = AssetMap.assetObjects[key];
        if(asset == undefined) {
            asset = love.graphics.newFont(assetPath, size);
            AssetMap.assetObjects[key] = asset;
        }   
    }

    static preloadImage(key: string){
        const assetPath = AssetMap.getAsset(key);
        if(assetPath == null) {
            throw new Error("Asset not found: " + key);
        }

        let asset = AssetMap.assetObjects[key];
        if(asset == undefined) {
            asset = love.graphics.newImage(assetPath);
            AssetMap.assetObjects[key] = asset;
        }   
    }

    static {
        this.addAsset("defaultFont", "res/fonts/RobotoSlab-VariableFont_wght.ttf")
        this.addAsset("defaultFont_30", "res/fonts/RobotoSlab-VariableFont_wght.ttf")
        this.addAsset("kitten", "res/images/kawaii-kitten.png")
        this.addAsset("kitten-xs", "res/images/kawaii-kitten-xs.png")

        this.preloadFont("defaultFont", 12);
        this.preloadFont("defaultFont_30", 30)
        this.preloadImage("kitten");
    }
}