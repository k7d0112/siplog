// 外部のホストされている画像を表示するための設定
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mnymgrhhcajqbmlwpxtt.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // または、domainsを使う場合
    // domains: ['mnymgrhhcajqbmlwpxtt.supabase.co'],
  },
};