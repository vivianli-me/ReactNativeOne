package com.reactnativeone.module;

import android.media.MediaPlayer;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;

/**
 * Created by lipeiwei on 16/10/14.
 */
public class MediaPlayerModule extends ReactContextBaseJavaModule {

    private MediaPlayer mPlayer;

    private ReactContext mContext;

    private static String EVENT_NAME = "ON_MEDIA_COMPLETION";

    public MediaPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "MediaPlayer";
    }

    @ReactMethod
    public void start(String path, final Promise promise) {
        if (mPlayer != null && mPlayer.isPlaying()) {
            mPlayer.stop();
            mPlayer.release();
            mPlayer = null;
        }
        try {
            mPlayer = new MediaPlayer();
            mPlayer.setDataSource(path);//Sets the data source (file-path or http/rtsp URL) to use.
            mPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    //应该是开始播放了
                    promise.resolve("开始播放");
                }
            });
            mPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {

                @Override
                public void onCompletion(MediaPlayer mp) {
                    //播放完成, 通过sendEvent发送事件
                    WritableMap params = Arguments.createMap();
                    sendEvent(mContext, EVENT_NAME, params);
                }
            });
            mPlayer.prepare();
            mPlayer.start();
        } catch (IOException e) {
            promise.reject(e.getMessage(), e);
        }
    }

    @ReactMethod
    public void stop(Promise promise) {
        if (mPlayer == null || !mPlayer.isPlaying()) {
            promise.resolve(null);
            return;
        }
        mPlayer.stop();
        mPlayer.release();
        mPlayer = null;
        promise.resolve(null);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
