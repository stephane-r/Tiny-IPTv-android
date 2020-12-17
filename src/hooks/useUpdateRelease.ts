import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import semverCompare from 'semver-compare';
import { version } from '../../package';
import { showSnakbar } from '../states/app';
import fetchAppRelease from '../utils/fetchGithubAppVersion';

interface UseUpdateReleaseHook {
  updateAvailable: boolean;
  downloadApk: () => void;
}

const useUpdateRelease = (): UseUpdateReleaseHook => {
  const [url, setUrl] = useState<null | string>(null);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    fetchAppRelease().then(({ tagName, browserDownloadUrl }) => {
      if (semverCompare(tagName.replace('v', ''), version) === 1) {
        setUrl(browserDownloadUrl);
        setUpdateAvailable(true);

        return setTimeout(
          () =>
            showSnakbar({
              message: 'A new update is available',
              action: {
                label: 'Download',
                onPress: () => Linking.openURL(url),
              },
            }),
          1000,
        );
      }
    });
  });

  return {
    updateAvailable,
  };
};
export default useUpdateRelease;
