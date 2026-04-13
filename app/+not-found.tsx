import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Sayfa Bulunamadı</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Ana Sayfaya Dön</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 20,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: Colors.onSurface,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 14,
    color: Colors.primary,
  },
});
