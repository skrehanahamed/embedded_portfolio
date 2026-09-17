/**
 * High-performance asset preloading & caching utility.
 * Decodes critical textures off the main thread directly into GPU memory
 * during the initial pre-flight loading screen.
 */

export const CRITICAL_SITE_ASSETS = [
  // 1. Core Dark & Light Cockpit & Panorama Textures
  '/assets/skills/car_rear.jpg',
  '/assets/skills/car_rear_light.jpg',
  '/assets/projects/footer_mountain_road.jpg',
  '/assets/projects/footer_mountain_road_light.jpg',
  '/assets/skills/microchip.jpg',
  '/assets/skills/microchip_light.jpg',

  // 2. Hero Section Backgrounds & Assets
  '/assets/hero/hero_home_bg.png',
  '/assets/hero/hero_home_bg_light.png',
  '/assets/hero/cluster_hud.png',
  '/assets/hero/wireframe_car_transparent.png',

  // 3. About Section Images & Tech Logos
  '/assets/about/mountain_highway.jpg',
  '/assets/about/mountain_highway_light.jpg',
  '/assets/about/trait_semiconductor.jpg',
  '/assets/about/trait_problem_solver.jpg',
  '/assets/about/trait_future_ready.jpg',
  '/assets/logos/autosar_light.svg',
  '/assets/logos/vector_light.svg',
  '/assets/logos/canoe_light.svg',
  '/assets/logos/trace32_light.svg',
  '/assets/logos/github_light.svg',

  // 4. Experience Section Visuals
  '/assets/experience/image.png',
  '/assets/experience/image_light.png',

  // 5. Featured Project Showcase Images
  '/assets/projects/project_apex_ev_cluster.jpg',
  '/assets/projects/project_asml_machine.jpg',
  '/assets/projects/project_ford_lincoln.jpg',
  '/assets/projects/project_stellantis_aida.jpg',
  '/assets/projects/project_virtual_ecu.jpg',
  '/assets/projects/project_suzuki_wagonr.jpg',
  '/assets/projects/project_volvo_hmi.jpg',
  '/assets/projects/project_automotive_yocto.jpg',
  '/assets/projects/project_apex_midend_cluster.jpg',
  '/assets/projects/project_apex_ivi.jpg',
];

// In-memory decoded image cache to prevent garbage collection of GPU textures
const memoryImageCache: HTMLImageElement[] = [];

/**
 * Preloads and GPU-decodes an image off the main thread.
 */
function preloadImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;

    // Use modern decode() API to warm GPU texture cache
    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(() => {
          memoryImageCache.push(img);
          resolve(true);
        })
        .catch(() => {
          // Even if decode fails (e.g. offline/blocked), resolve gracefully
          resolve(false);
        });
    } else {
      (img as HTMLImageElement).onload = () => {
        memoryImageCache.push(img);
        resolve(true);
      };
      (img as HTMLImageElement).onerror = () => resolve(false);
    }
  });
}

/**
 * Preloads the entire site assets and warms the CacheStorage API.
 * Reports progress (0 to 100) via optional callback.
 */
export async function preloadFullSite(onProgress?: (percent: number) => void): Promise<void> {
  // 1. Parallel Cache API storage if supported (persists across reloads)
  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open('portfolio-site-cache-v1');
      // Non-blocking background caching
      cache.addAll(CRITICAL_SITE_ASSETS).catch(() => {});
    } catch {
      // Ignore cache storage errors in private browsing modes
    }
  }

  // 2. Decode textures in parallel with bounded concurrency for mobile CPUs
  const total = CRITICAL_SITE_ASSETS.length;
  let loaded = 0;

  const updateProgress = () => {
    loaded += 1;
    if (onProgress) {
      const percent = Math.min(100, Math.round((loaded / total) * 100));
      onProgress(percent);
    }
  };

  // Decode batches of 6 concurrently to balance network and mobile GPU memory
  const batchSize = 6;
  for (let i = 0; i < total; i += batchSize) {
    const batch = CRITICAL_SITE_ASSETS.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (url) => {
        await preloadImage(url);
        updateProgress();
      })
    );
  }
}
