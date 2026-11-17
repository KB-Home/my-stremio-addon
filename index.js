const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
    id: "org.my.custom.movies",
    version: "1.0.0",
    name: "คลังหนังส่วนตัวของฉัน",
    description: "รวมหนังและซีรีส์จาก URL ส่วนตัว",
    resources: ["catalog", "meta", "stream"],
    types: ["movie", "series"],
    catalogs: [
        {
            type: "movie",
            id: "my_movies_catalog",
            name: "หนังส่วนตัว"
        }
    ],
    idPrefixes: ["my_id_"]
};

const builder = new addonBuilder(manifest);

// ฐานข้อมูลหนังทดสอบ (เดี๋ยวเราจะมาเปลี่ยนตรงนี้เป็นหนังและ URL ของคุณ)
const myDatabase = {
    "my_id_01": {
        id: "my_id_01",
        type: "movie",
        name: "หนังทดสอบเรื่องที่ 1 (Big Buck Bunny)",
        poster: "https://wikimedia.org",
        description: "วิดีโอทดสอบระบบสตรีมมิ่งจาก URL",
        streams: [
            {
                title: "ดูแบบ 1080p",
                url: "https://googleapis.com"
            }
        ]
    }
};

builder.defineCatalogHandler(({ type, id }) => {
    if (type === "movie" && id === "my_movies_catalog") {
        const metas = Object.values(myDatabase).map(item => ({
            id: item.id,
            type: item.type,
            name: item.name,
            poster: item.poster
        }));
        return Promise.resolve({ metas });
    }
    return Promise.resolve({ metas: [] });
});

builder.defineMetaHandler(({ type, id }) => {
    return Promise.resolve({ meta: myDatabase[id] || null });
});

builder.defineStreamHandler(({ type, id }) => {
    return Promise.resolve({ streams: myDatabase[id] ? myDatabase[id].streams : [] });
});

const port = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: port });

