const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// 1. ตั้งค่าหมวดหมู่ทั้งหมด (แสดงในหน้า Discover ของ Stremio)
const manifest = {
    id: "org.my.custom.allcategories",
    version: "2.0.0",
    name: "คลังบันเทิงส่วนตัว (ครบทุกหมวด)",
    description: "รวมภาพยนตร์ ซีรีส์ อนิเมะ รายการทีวี และสารคดีส่วนตัว",
    resources: ["catalog", "meta", "stream"],
    types: ["movie", "series", "tv", "anime", "other"],
    catalogs: [
        {
            type: "movie",
            id: "my_movies",
            name: "ภาพยนตร์ส่วนตัว"
        },
        {
            type: "series",
            id: "my_series",
            name: "ซีรีส์ส่วนตัว"
        },
        {
            type: "anime",
            id: "my_anime",
            name: "อนิเมะส่วนตัว"
        },
        {
            type: "tv",
            id: "my_tv",
            name: "รายการทีวี / วาไรตี้"
        },
        {
            type: "other",
            id: "my_docs",
            name: "สารคดี / อื่นๆ"
        }
    ],
    idPrefixes: ["my_id_"]
};

const builder = new addonBuilder(manifest);

// =========================================================================
// 🎬 พื้นที่ใส่ข้อมูลและลิงก์ของคุณ (แก้ไขข้อความใน "..." ได้ตามต้องการ)
// =========================================================================
const myDatabase = {

    // ---------------------------------------------------------------------
    // หมวดที่ 1: ภาพยนตร์ (type: "movie") - แบบเรื่องเดียวจบ
    // ---------------------------------------------------------------------
    "my_id_movie_01": {
        id: "my_id_movie_01",
        type: "movie",
        name: "ชื่อภาพยนตร์เรื่องที่ 1",
        poster: "วางลิงก์รูปปก_jpg_หรือ_png_ตรงนี้",
        description: "ใส่เรื่องย่อภาพยนตร์",
        streams: [
            {
                title: "ดูแบบ 1080p (ลิงก์หลัก)",
                url: "วางลิงก์วิดีโอ_mp4_หรือ_m3u8_ตรงนี้"
            },
            {
                title: "ดูแบบสำรอง (ลิงก์ 2)",
                url: "วางลิงก์วิดีโอสำรองตรงนี้"
            }
        ]
    },

    // ---------------------------------------------------------------------
    // หมวดที่ 2: ซีรีส์ (type: "series") - แบบแบ่งซีซันและตอน
    // ---------------------------------------------------------------------
    "my_id_series_01": {
        id: "my_id_series_01",
        type: "series",
        name: "ชื่อซีรีส์เรื่องที่ 1",
        poster: "วางลิงก์รูปปก_jpg_หรือ_png_ตรงนี้",
        description: "ใส่เรื่องย่อซีรีส์",
        videos: [
            {
                id: "my_id_series_01:1:1", // รูปแบบ รหัสเรื่อง:ซีซันที่:ตอนที่
                title: "ตอนที่ 1",
                season: 1,
                episode: 1,
                released: "2026-01-01T00:00:00.000Z",
                streams: [
                    {
                        title: "ดูตอนที่ 1 (HD)",
                        url: "วางลิงก์วิดีโอตอนที่_1_ตรงนี้"
                    }
                ]
            },
            {
                id: "my_id_series_01:1:2",
                title: "ตอนที่ 2",
                season: 1,
                episode: 2,
                released: "2026-01-02T00:00:00.000Z",
                streams: [
                    {
                        title: "ดูตอนที่ 2 (HD)",
                        url: "วางลิงก์วิดีโอตอนที่_2_ตรงนี้"
                    }
                ]
            }
        ]
    },

    // ---------------------------------------------------------------------
    // หมวดที่ 3: อนิเมะ (type: "anime") - แบบแบ่งตอนเหมือนซีรีส์
    // ---------------------------------------------------------------------
    "my_id_anime_01": {
        id: "my_id_anime_01",
        type: "anime",
        name: "ชื่ออนิเมะเรื่องที่ 1",
        poster: "วางลิงก์รูปปก_jpg_หรือ_png_ตรงนี้",
        description: "ใส่เรื่องย่ออนิเมะ",
        videos: [
            {
                id: "my_id_anime_01:1:1",
                title: "ตอนที่ 1",
                season: 1,
                episode: 1,
                released: "2026-01-01T00:00:00.000Z",
                streams: [
                    {
                        title: "ซับไทย 1080p",
                        url: "วางลิงก์วิดีโออนิเมะตอนที่_1_ตรงนี้"
                    }
                ]
            }
        ]
    },

    // ---------------------------------------------------------------------
    // หมวดที่ 4: รายการทีวี / วาไรตี้ (type: "tv") - แบบแบ่งตอนหรือสตรีมสด
    // ---------------------------------------------------------------------
    "my_id_tv_01": {
        id: "my_id_tv_01",
        type: "tv",
        name: "ชื่อรายการทีวี / วาไรตี้ที่ 1",
        poster: "วางลิงก์รูปปก_jpg_หรือ_png_ตรงนี้",
        description: "ใส่รายละเอียดรายการ",
        videos: [
            {
                id: "my_id_tv_01:1:1",
                title: "EP.1",
                season: 1,
                episode: 1,
                released: "2026-01-01T00:00:00.000Z",
                streams: [
                    {
                        title: "ดูรายการ EP.1",
                        url: "วางลิงก์วิดีโอรายการ_EP1_ตรงนี้"
                    }
                ]
            }
        ]
    },

    // ---------------------------------------------------------------------
    // หมวดที่ 5: สารคดี / อื่นๆ (type: "other") - แบบตอนเดียวจบ
    // ---------------------------------------------------------------------
    "my_id_doc_01": {
        id: "my_id_doc_01",
        type: "other",
        name: "ชื่อสารคดีเรื่องที่ 1",
        poster: "วางลิงก์รูปปก_jpg_หรือ_png_ตรงนี้",
        description: "ใส่เรื่องย่อสารคดี",
        streams: [
            {
                title: "ดูสารคดี (HD)",
                url: "วางลิงก์วิดีโอสารคดีตรงนี้"
            }
        ]
    }

};

// =========================================================================
// ⚙️ ส่วนระบบประมวลผลหลังบ้าน (รองรับทุกหมวดหมู่ - ห้ามแก้ไขส่วนนี้)
// =========================================================================
builder.defineCatalogHandler(({ type }) => {
    const metas = Object.values(myDatabase)
        .filter(item => item.type === type)
        .map(item => ({
            id: item.id,
            type: item.type,
            name: item.name,
            poster: item.poster
        }));
    return Promise.resolve({ metas });
});

builder.defineMetaHandler(({ id }) => {
    const item = myDatabase[id];
    if (!item) return Promise.resolve({ meta: null });
    
    const metaCopy = { ...item };
    delete metaCopy.streams;
    if (metaCopy.videos) {
        metaCopy.videos = metaCopy.videos.map(v => {
            const vCopy = { ...v };
            delete vCopy.streams;
            return vCopy;
        });
    }
    return Promise.resolve({ meta: metaCopy });
});

builder.defineStreamHandler(({ id }) => {
    // 1. ค้นหาแบบเรื่องเดียวจบ (Movie / Other)
    if (myDatabase[id] && myDatabase[id].streams) {
        return Promise.resolve({ streams: myDatabase[id].streams });
    }
    // 2. ค้นหาแบบแบ่งตอน (Series / Anime / TV)
    const baseId = id.split(":")[0];
    const parentItem = myDatabase[baseId];
    if (parentItem && parentItem.videos) {
        const episode = parentItem.videos.find(v => v.id === id);
        return Promise.resolve({ streams: episode ? episode.streams : [] });
    }
    return Promise.resolve({ streams: [] });
});

const port = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: port });
