const { Router } = require('express');
const router = Router();

const axios = require('axios');

const config = require('../../nuxt.config.js');

router.get('/.xml', async (sitemapReq, sitemapRes, sitemapNext) => {
  const host = sitemapReq.hostname;
  const langDomain = ['ru', 'pt', 'it', 'de', 'es', 'uk'].find(lang => host.includes(`${lang}.`));
  const language = langDomain ?? 'en';
  const pathApi = `${config.env.VUE_APP_BASEURL}/sitemap.xml`;

  try {
    if (!config.env.IS_READER_APP) {
      const { data } = await axios.get(pathApi, {
        params: { language }
      });

      if (data) {
        sitemapRes.setHeader('Content-Type', 'application/xml');
        sitemapRes.send(data);
      }
    }
  } catch (sitemapError) {
    sitemapNext(sitemapError);
  }
});

module.exports = router;
