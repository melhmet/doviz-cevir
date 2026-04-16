import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Linking, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { fetchFinanceNews, type NewsArticle } from '@/services/news';

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMin = Math.floor((now - then) / 60000);

  if (diffMin < 1) return 'Az önce';
  if (diffMin < 60) return `${diffMin} dk önce`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} sa önce`;

  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} gün önce`;
}

function NewsItem({ article, index }: { article: NewsArticle; index: number }) {
  const { colors } = useTheme();

  const handlePress = () => {
    Linking.openURL(article.url);
  };

  return (
    <Pressable onPress={handlePress} style={[styles.newsItem, { borderTopColor: colors.outlineVariant + '1A' }]}>
      <View style={[styles.newsIndex, { borderColor: colors.outlineVariant + '33' }]}>
        <Text style={[styles.newsIndexText, { color: colors.onSurfaceVariant }]}>{String(index + 1).padStart(2, '0')}</Text>
      </View>
      <View style={styles.newsContent}>
        <Text style={[styles.newsTitle, { color: colors.onSurface }]} numberOfLines={2}>
          {article.title}
        </Text>
        <View style={styles.newsMeta}>
          <Text style={[styles.newsSource, { color: colors.primary }]}>{article.source.name}</Text>
          <Text style={[styles.newsDot, { color: colors.onSurfaceVariant }]}>·</Text>
          <Text style={[styles.newsTime, { color: colors.onSurfaceVariant }]}>{timeAgo(article.publishedAt)}</Text>
          <MaterialIcons
            name="open-in-new"
            size={10}
            color={colors.onSurfaceVariant}
            style={styles.linkIcon}
          />
        </View>
      </View>
    </Pressable>
  );
}

export function MarketAnalysis() {
  const { colors } = useTheme();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const articles = await fetchFinanceNews();
      setNews(articles);
      if (articles.length === 0) setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return (
    <View style={[styles.container, {
      borderColor: colors.primary + '1A',
      backgroundColor: colors.surfaceContainerLowest,
    }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name={'article' as React.ComponentProps<typeof MaterialIcons>['name']} size={18} color={colors.primary} />
          <Text style={[styles.title, { color: colors.primary }]}>Finans Haberleri</Text>
        </View>
        {!loading && (
          <Pressable onPress={loadNews} hitSlop={8}>
            <MaterialIcons name="refresh" size={18} color={colors.onSurfaceVariant} />
          </Pressable>
        )}
      </View>

      {/* Content */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.onSurfaceVariant }]}>Haberler yükleniyor...</Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.center}>
          <MaterialIcons name="wifi-off" size={24} color={colors.onSurfaceVariant} />
          <Text style={[styles.errorText, { color: colors.onSurfaceVariant }]}>Haberler yüklenemedi</Text>
          <Pressable onPress={loadNews} style={[styles.retryBtn, { borderColor: colors.primary + '33' }]}>
            <Text style={[styles.retryText, { color: colors.primary }]}>Tekrar Dene</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && news.map((article, i) => (
        <NewsItem key={article.url} article={article} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  center: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  loadingText: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
  },
  errorText: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
  },
  retryBtn: {
    marginTop: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  retryText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  newsItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  newsIndex: {
    width: 24,
    height: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  newsIndexText: {
    fontFamily: 'JetBrainsMono',
    fontSize: 9,
  },
  newsContent: {
    flex: 1,
    gap: 6,
  },
  newsTitle: {
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 13,
    lineHeight: 19,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newsSource: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
  },
  newsDot: {
    fontSize: 10,
  },
  newsTime: {
    fontFamily: 'JetBrainsMono',
    fontSize: 10,
  },
  linkIcon: {
    marginLeft: 4,
  },
});
