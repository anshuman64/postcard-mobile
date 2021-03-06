package com.insiya.android;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.linkpreview.RNReactNativeLinkPreviewPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.microsoft.codepush.react.CodePush;
import com.brentvatne.react.ReactVideoPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.sudoplz.reactnativeamplitudeanalytics.RNAmplitudeSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNReactNativeLinkPreviewPackage(),
            new ReactNativeRestartPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new ReactVideoPackage(),
            new BridgePackage(),
            new ReactNativeContacts(),
            new ReactNativeOneSignalPackage(),
            new PickerPackage(),
            new RNFetchBlobPackage(),
            new RNAmplitudeSDKPackage(MainApplication.this),
            new VectorIconsPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAuthPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
