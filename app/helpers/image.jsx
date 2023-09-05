import { useEffect, useRef, useState } from "react";
import * as FileSystem from "expo-file-system";
import Animated from "react-native-reanimated";

function getImgXtension(uri) {
  var basename = uri.split(/[\\/]/).pop();
  return /[.]/.exec(basename) ? /[^.]+$/.exec(basename) : undefined;
}

async function findImageInCache(uri) {
  try {
    let info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}
async function cacheImage(uri, cacheUri, callback) {
  try {
    const downloadImage = FileSystem.createDownloadResumable(
      uri,
      cacheUri,
      {},
      callback
    );
    const downloaded = await downloadImage.downloadAsync();
    return {
      cached: true,
      err: false,
      path: downloaded.uri,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
}

export const CachedImage = (props) => {
  const { uri, style } = props;
  const isMounted = useRef(true);
  const [imgUri, setUri] = useState("");
  console.log(`props ${JSON.stringify(props)}`);
  useEffect(() => {
    async function loadImg() {
      let imgXt = getImgXtension(uri);
      if (!imgXt || !imgXt.length) {
        Alert.alert(`Couldn't load Image!`);
        return;
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${uri}.${imgXt[0]}`;
      let imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        console.log("cached!");
        setUri(cacheFileUri);
      } else {
        let cached = await cacheImage(uri, cacheFileUri, () => {});
        if (cached.cached) {
          console.log("cached new!");
          setUri(cached.path);
        } else {
          Alert.alert(`Couldn't load Image!`);
        }
      }
    }
    loadImg();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      {imgUri && (
        <Animated.Image source={{ uri: imgUri }} style={style} {...props} />
      )}
    </>
  );
};
