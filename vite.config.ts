import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import glob from "glob";
import fs from "fs";
import copy from "rollup-plugin-copy";


const getEntry = () => {
  const list = {};
  // 遍历文件夹中含有main.ts的文件夹路径
  const allEntry = glob.sync("./src/views/**/main.ts");
  // 创建多页面模板
  allEntry.forEach((entry: string) => {
    const pathArr = entry.split("/");
    const name = pathArr[pathArr.length - 2];
    const tempHtml = `src/views/${name}/main.html`;
    // 获取模板
    const temp = fs.readFileSync(tempHtml);
    // 判断文件是否存在
    try {
      fs.accessSync(tempHtml);
    } catch (err) {
      console.log(`创建${name}/main.html文件`);
      const index = temp.toString().indexOf("</body>");
      const content =
        temp.toString().slice(0, index) +
        `<script type="module" src=".${entry}"></script>` +
        temp.toString().slice(index);
      fs.writeFile(tempHtml, content, err => {
        if (err) console.log(err);
      });
    }
    // input中的配置
    list[name] = path.resolve(__dirname, tempHtml);
  });
  return list;
}

const pageEntry = getEntry();

const plugins = [
  vue(),

   copy({
      targets: [
        { src: "src/script/*", dest: "dist" },
        { src: "dist/src/views/index/*.html", dest: "dist",rename: 'index.html' },
        { src: "dist/src/views/popup/*.html", dest: "dist",rename: 'popup.html' },
        { src: "src/assets", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
    
  // chromeExtension(),
  // viteCompression({
  //   ext: ".gz",
  //   algorithm: "gzip",
  //   deleteOriginFile: false
  // }),
  // legacy({
  //   targets: [
  //     "> 1%, last 1 version, ie >= 11",
  //     "safari >= 10",
  //     "Android > 39",
  //     "Chrome >= 60",
  //     "Safari >= 10.1",
  //     "iOS >= 10.3",
  //     "Firefox >= 54",
  //     "Edge >= 15"
  //   ],
  //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
  //   polyfills: ["es.promise.finally", "es/map", "es/set"],
  //   modernPolyfills: ["es.promise.finally"]
  // })
];

export default defineConfig({
  server: {
    fs: {
      strict: false
    }
  },
  plugins,
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  build: {
    outDir: "dist",

    //     rollupOptions: {
    //   input: ["./src/views/index/main.html"],
    //   output: {
    //     chunkFileNames: "[name].[hash].js",
    //     assetFileNames: "[name].[hash].[ext]",
    //     entryFileNames: "[name].js",
    //     dir: "dist/assets/",
    //   }
    // },

   rollupOptions: {
     input: pageEntry,
     output: {
       manualChunks(id) {
         console.log('[id]', id)
          if (id.includes("node_modules")) {
           return id
             .toString()
             .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
       }
     }
    }
  }
});
