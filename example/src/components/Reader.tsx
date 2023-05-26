import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import type { File, Link, Locator } from 'react-native-readium';
import { ReadiumView, Settings } from 'react-native-readium';

import {
  DEFAULT_SETTINGS,
  EPUB_PATH,
  EPUB_URL,
  INITIAL_LOCATION,
} from '../consts';
import RNFS from '../utils/RNFS';

export const Reader: React.FC = () => {
  const [toc, setToc] = useState<Link[] | null>([]);
  const [file, setFile] = useState<File>();
  const [location, setLocation] = useState<Locator | Link>();
  const [settings, setSettings] = useState<Partial<Settings>>(DEFAULT_SETTINGS);
  const ref = useRef<any>();

  useEffect(() => {
    async function run() {
      if (Platform.OS === 'web') {
        setFile({
          url: EPUB_URL,
          initialLocation: INITIAL_LOCATION,
        });
      } else {
        const exists = await RNFS.exists(EPUB_PATH);
        if (!exists) {
          console.log(`Downloading file: '${EPUB_URL}'`);
          const { promise } = RNFS.downloadFile({
            fromUrl: EPUB_URL,
            toFile: EPUB_PATH,
            background: true,
            discretionary: true,
          });

          // wait for the download to complete
          await promise;
        } else {
          console.log(`File already exists. Skipping download.`);
        }

        setFile({
          url: EPUB_PATH,
          initialLocation: INITIAL_LOCATION,
        });
      }
    }

    run();
  }, []);

  if (file) {
    return (
      <ReadiumView
        ref={ref}
        file={file}
        location={location}
        settings={settings}
        onLocationChange={(locator: Locator) => setLocation(locator)}
        onTableOfContents={(toc: Link[] | null) => {
          if (toc) setToc(toc);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>downloading file</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  reader: {
    flexDirection: 'row',
    width: '100%',
    height: '90%',
  },
  readiumContainer: {
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 10,
  },
});
