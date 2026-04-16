"use client";

import { useMemo, useRef, useState } from "react";

type MediaItem = {
  id: number;
  type: "Image" | "Video";
  title: string;
  creator: string;
  views: string;
  category: string;
  thumbnail: string;
  description?: string;
};

export default function HomePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("You");
  const [category, setCategory] = useState("All");
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewType, setPreviewType] = useState<"Image" | "Video">("Image");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [uploadedPosts, setUploadedPosts] = useState<MediaItem[]>([]);

  const featuredPosts: MediaItem[] = [
    {
      id: 1,
      type: "Video",
      title: "City Night Cinematic",
      creator: "Ava Studio",
      views: "1.2M",
      category: "Travel",
      thumbnail:
        "https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?auto=format&fit=crop&w=1200&q=80",
      description: "Urban mood, cinematic travel clip.",
    },
    {
      id: 2,
      type: "Image",
      title: "Wild Nature Collection",
      creator: "Lumo Visuals",
      views: "845K",
      category: "Nature",
      thumbnail:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      description: "Nature-focused image collection.",
    },
    {
      id: 3,
      type: "Video",
      title: "Street Food Moments",
      creator: "Global Bites",
      views: "2.4M",
      category: "Food",
      thumbnail:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      description: "Fast cuts from street food scenes.",
    },
    {
      id: 4,
      type: "Image",
      title: "Minimal Tech Setup",
      creator: "NexFrame",
      views: "630K",
      category: "Tech",
      thumbnail:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80",
      description: "Desk, devices, and clean composition.",
    },
    {
      id: 5,
      type: "Video",
      title: "Luxury Places Reels",
      creator: "VistaFlow",
      views: "980K",
      category: "Lifestyle",
      thumbnail:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      description: "Luxury travel and lifestyle media.",
    },
    {
      id: 6,
      type: "Image",
      title: "Desert Story Frame",
      creator: "Nomad Lens",
      views: "420K",
      category: "Adventure",
      thumbnail:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
      description: "Adventure frame with warm tones.",
    },
  ];

  const categories = [
    "All",
    "Travel",
    "Nature",
    "Food",
    "Tech",
    "Lifestyle",
    "Adventure",
  ];

  const monetizationOptions = [
    {
      title: "Reklam Gelirleri",
      text: "Platform trafik aldıkça banner, içerik içi ve video reklam geliri devreye alınabilir.",
    },
    {
      title: "Premium Üyelik",
      text: "Özel albümler, özel videolar ve reklamsız deneyim sunulabilir.",
    },
    {
      title: "Sponsorlu Yazılar",
      text: "Markalar, öne çıkan reklam yerleşimleri ve kampanya görünürlüğü için ödeme yapabilir.",
    },
    {
      title: "Dijital Satışlar",
      text: "LUT paketleri, hazır ayarlar, eğitim videoları, stok videolar veya görsel lisansları satılabilir.",
    },
  ];

  const stats = [
    { value: "190+", label: "Ülke Erişimi" },
    { value: "24/7", label: "Yayın Akışı" },
    { value: "4", label: "Gelir Modelleri" },
    { value: "∞", label: "Ölçeklenme Potansiyeli" },
  ];

  const allPosts = useMemo(() => {
    return [...uploadedPosts, ...featuredPosts];
  }, [uploadedPosts]);

  const visiblePosts = useMemo(() => {
    if (selectedFilter === "All") return allPosts;
    return allPosts.filter((post) => post.category === selectedFilter);
  }, [allPosts, selectedFilter]);

  function handleChooseFile() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    if (file.type.startsWith("video")) {
      setPreviewType("Video");
    } else {
      setPreviewType("Image");
    }

    if (!title.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setTitle(cleanName);
    }
  }

  function handlePublish() {
    if (!previewUrl || !title.trim()) {
      alert("Önce bir dosya seç ve başlık gir.");
      return;
    }

    const newPost: MediaItem = {
      id: Date.now(),
      type: previewType,
      title: title.trim(),
      creator: creator.trim() || "You",
      views: "Yeni",
      category: category === "All" ? "Lifestyle" : category,
      thumbnail: previewUrl,
      description: description.trim(),
    };

    setUploadedPosts((prev) => [newPost, ...prev]);
    setSelectedFilter("All");
    setTitle("");
    setDescription("");
    setCategory("All");
    setPreviewUrl("");
    setPreviewType("Image");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-black shadow-lg">
              M
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">MediaWorld</div>
              <div className="text-sm text-zinc-400">
                Fotoğraf ve video platformu
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 lg:flex">
            <a href="#hero" className="transition hover:text-white">
              Başlangıç
            </a>
            <a href="#upload" className="transition hover:text-white">
              Yükleme
            </a>
            <a href="#discover" className="transition hover:text-white">
              Keşfet
            </a>
            <a href="#monetize" className="transition hover:text-white">
              Para Kazanmak
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-white/15 px-4 py-2.5 text-sm font-medium transition hover:bg-white/5">
              Giriş Yap
            </button>
            <button className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90">
              Ücretsiz Başla
            </button>
          </div>
        </div>
      </header>

      <section id="hero" className="mx-auto w-full max-w-7xl px-6 pb-10 pt-14 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
              Küresel kitle • büyüme • içerik platformu • gelirleşme
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
              Resim ve video paylaş, kitle büyüt, sonra gelir modeline çevir
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              Bu sürümde gerçek dosya seçme, önizleme ve yüklediğin içeriği anında
              kartlarda gösterme mantığı var. Sonraki aşamada kullanıcı hesabı,
              veritabanı ve gerçek yayın sistemi eklenir.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#upload"
                className="rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-black transition hover:opacity-90"
              >
                İçerik Yükle
              </a>
              <a
                href="#discover"
                className="rounded-2xl border border-white/15 px-6 py-3.5 text-base font-semibold transition hover:bg-white/5"
              >
                Akışı Keşfet
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                >
                  <div className="text-4xl font-black">{stat.value}</div>
                  <div className="mt-3 text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-zinc-950/80 p-4 shadow-2xl">
            <div className="overflow-hidden rounded-[24px]">
              {previewUrl ? (
                previewType === "Video" ? (
                  <video
                    src={previewUrl}
                    controls
                    className="h-[520px] w-full object-cover"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-[520px] w-full object-cover"
                  />
                )
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1400&q=80"
                  alt="Hero"
                  className="h-[520px] w-full object-cover"
                />
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-[24px] bg-zinc-900/80 p-5">
              <div>
                <div className="text-lg font-semibold">Canlı önizleme alanı</div>
                <div className="mt-1 text-sm text-zinc-400">
                  Seçtiğin medya burada büyük görünür
                </div>
              </div>
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                V3 görünüm
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="upload" className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-white/10 bg-zinc-950/80 p-7">
            <div className="text-3xl font-bold">Yükleme paneli</div>
            <p className="mt-2 text-zinc-400">
              Resim veya video seç, önizle, sonra yayınla.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="mt-6 rounded-[28px] border border-dashed border-white/15 bg-zinc-900/70 p-10 text-center">
              <div className="text-xl font-semibold">Dosyanı seç</div>
              <div className="mt-2 text-sm text-zinc-400">
                JPG, PNG, WEBP, MP4, MOV
              </div>
              <button
                onClick={handleChooseFile}
                className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Dosya Seç
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <input
                className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/50"
                placeholder="İçerik başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/50"
                placeholder="Oluşturan kişi"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />

              <textarea
                className="min-h-[130px] rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/50"
                placeholder="Açıklama yaz"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 outline-none transition focus:border-cyan-400/50"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePublish}
                className="rounded-2xl bg-cyan-400 px-4 py-3.5 text-base font-bold text-black transition hover:opacity-90"
              >
                Şimdi Yayınla
              </button>
            </div>
          </div>

          <div
            id="discover"
            className="rounded-[32px] border border-white/10 bg-zinc-950/80 p-7"
          >
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="text-3xl font-bold">İçeriği keşfedin</div>
                <div className="mt-2 text-zinc-400">
                  Yüklediğin içerik burada en üstte görünür
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedFilter(item)}
                    className={
                      "rounded-full px-4 py-2.5 text-sm font-medium transition " +
                      (selectedFilter === item
                        ? "bg-white text-black"
                        : "border border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800")
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {visiblePosts.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/90 transition hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="relative">
                    {post.type === "Video" ? (
                      <video
                        src={post.thumbnail}
                        controls
                        className="h-60 w-full object-cover"
                      />
                    ) : (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-60 w-full object-cover"
                      />
                    )}

                    <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold">
                      {post.type}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xl font-bold leading-6">{post.title}</div>
                    <div className="mt-2 text-sm text-zinc-400">
                      by {post.creator}
                    </div>

                    {post.description ? (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-400">
                        {post.description}
                      </p>
                    ) : null}

                    <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                      <span className="rounded-full border border-white/10 px-3 py-1.5 text-zinc-300">
                        {post.category}
                      </span>
                      <span className="text-zinc-400">{post.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="monetize" className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Monetization
          </div>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            İleride nasıl para kazanabilir?
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {monetizationOptions.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-zinc-950/80 p-6 transition hover:border-white/20"
            >
              <div className="text-xl font-bold">{item.title}</div>
              <p className="mt-4 leading-7 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-zinc-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>© 2026 MediaWorld. Tüm hakları saklıdır.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Gizlilik
            </a>
            <a href="#" className="hover:text-white">
              Şartlar
            </a>
            <a href="#" className="hover:text-white">
              İletişim
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
