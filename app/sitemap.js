
import { siteConfig } from "@/lib/site";

export default function sitemap() {
  return [
  {
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1
  },
  {
    url: `${siteConfig.url}/#platform`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  },
  {
    url: `${siteConfig.url}/#process`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  },
  {
    url: `${siteConfig.url}/#results`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  },
  {
    url: `${siteConfig.url}/#faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6
  },
  {
    url: `${siteConfig.url}/#contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8
  }];

}