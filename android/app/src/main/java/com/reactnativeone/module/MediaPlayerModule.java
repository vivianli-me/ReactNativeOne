package com.reactnativeone.module;

import android.media.MediaPlayer;
import android.support.annotation.Nullable;

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

    private final static int STATE_NO_PLAYING = -1;
    private final static int STATE_PLAYING = 1;
    private int mState = STATE_NO_PLAYING;

    public MediaPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "MediaPlayer";
    }

    private boolean isPlaying() {
        return (mState == STATE_PLAYING);
    }

    @ReactMethod
    public void start(final String url, final Promise promise) {
        if (mPlayer != null) {
            if (isPlaying()) {
                mPlayer.reset();
            }
        } else {
            mPlayer = new MediaPlayer();
        }
        try {
            mPlayer.setDataSource(url);//Sets the data source (file-path or http/rtsp URL) to use.
            mPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    //应该是开始播放了
                    promise.resolve("开始播放");
                    mPlayer.start();
                }
            });
            mPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {

                @Override
                public void onCompletion(MediaPlayer mp) {
                    //播放完成, 通过sendEvent发送事件
                    sendEvent(mContext, EVENT_NAME, null);
                }
            });
            mPlayer.prepareAsync();//同步跟异步
            mState = STATE_PLAYING;
        } catch (IOException e) {
            mState = STATE_NO_PLAYING;
            mPlayer.reset();
            promise.reject(e.getMessage(), e);
        }
    }

    @ReactMethod
    public void stop(Promise promise) {
        if (mPlayer == null || !isPlaying()) {
            promise.resolve(null);
            return;
        }
        mState = STATE_NO_PLAYING;
        mPlayer.reset();
        promise.resolve(null);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
