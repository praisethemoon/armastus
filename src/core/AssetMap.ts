import { Font, Image } from "love.graphics";

export type Love2DAsset = Image | Font

export class AssetMap {
    static assetsIdMap: { [key: string]: string } = {};

    static imagesMap: { [key: string]: Image } = {};
    static fontsMap: { [key: string]: (Font|null)[] } = {};

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

        let asset = AssetMap.imagesMap[key];
        if(asset == undefined) {
            this.preloadImage(key);
        }

        return AssetMap.imagesMap[key];
    }

    static loadFont(key: string, size: number): Font {
        let fontArray = AssetMap.fontsMap[key];
        if(fontArray == undefined) {
            AssetMap.fontsMap[key] = [];
        }

        let font = AssetMap.fontsMap[key][size];
        if(font == null) {
            // find the path of the font
            const assetPath = AssetMap.getAsset(key);
            if(assetPath == null) {
                throw new Error("Asset not found: " + key);
            }

            const fontData = love.graphics.newFont(assetPath, size);
            AssetMap.fontsMap[key][size] = fontData;

            return fontData;
        }
        return font;
    }


    static preloadImage(key: string){
        const assetPath = AssetMap.getAsset(key);
        if(assetPath == null) {
            throw new Error("Asset not found: " + key);
        }

        let asset = AssetMap.imagesMap[key];
        if(asset == undefined) {
            asset = love.graphics.newImage(assetPath);
            AssetMap.imagesMap[key] = asset;
        }   
    }

    static {
        this.addAsset("defaultFont", "res/fonts/RobotoSlab-VariableFont_wght.ttf")
        this.addAsset("defaultFont_30", "res/fonts/RobotoSlab-VariableFont_wght.ttf")
        this.addAsset("kitten", "res/images/kawaii-kitten.png")
        this.addAsset("kitten-xs", "res/images/kawaii-kitten-xs.png")

        this.loadFont("defaultFont", 12);
        this.loadFont("defaultFont_30", 30)
        this.preloadImage("kitten");


        // defaults:
        this.addAsset("fa_brands", "res/fonts/fa-brands-400.ttf")
        this.addAsset("fa_regular", "res/fonts/fa-regular-400.ttf")
        this.addAsset("fa_solid", "res/fonts/fa-solid-900.ttf")
    }
}