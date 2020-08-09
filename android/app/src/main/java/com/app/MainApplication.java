package com.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.app.common.ModuleStorage;

import java.util.Arrays;
import java.util.List;

import static com.app.common.ModuleStorage.getModuleStorage;

/**
 *  Inits ReactNativeHost instance including registration of main native packages
 *
 * @author  Spayker
 * @version 1.0
 * @since   06/01/2019
 */
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return true;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      ModuleStorage appModuleStorage = getModuleStorage();
      return Arrays.asList(
              appModuleStorage.getMainReactPackage(),
              appModuleStorage.getDeviceConnectorPackage(),
              appModuleStorage.getHeartBeatMeasurerPackage(),
              appModuleStorage.getInfoPackage()
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
    SoLoader.init(this, false);
  }
}
