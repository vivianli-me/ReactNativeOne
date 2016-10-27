package com.reactnativeone.module;

import android.media.MediaPlayer;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by lipeiwei on 16/10/14.
 */
public class MediaPlayerModule extends ReactContextBaseJavaModule {

    private MediaPlayer mPlayer;

    private ReactContext mContext;

    private static String EVENT_NAME = "ON_MEDIA_COMPLETION";

    private static String MEDIA_PROGRESS_UPDATE = "MEDIA_PROGRESS_UPDATE";
    private static int MEDIA_PROGRESS_UPDATE_PERIOD = 1000;//更新周期
    private TimerTask mTimerTask;
    private Timer mTimer;

    private final static int STATE_NO_PLAYING = -1;
    private final static int STATE_PLAYING = 1;
    private int mState = STATE_NO_PLAYING;

    private int mCurrentPosition;

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
                stopTimerTask();
            }
        } else {
            mPlayer = new MediaPlayer();
        }
        try {
            mState = STATE_PLAYING;
            mPlayer.setDataSource(url);//Sets the data source (file-path or http/rtsp URL) to use.
            mPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    //应该是开始播放了
                    promise.resolve("开始播放");
                    mPlayer.seekTo(MediaPlayerModule.this.mCurrentPosition);
                    mPlayer.start();
                    startTimeTask();
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
        stopTimerTask();
        mState = STATE_NO_PLAYING;
        mPlayer.reset();
        promise.resolve(null);
    }

    /**
     * @param msec 单位毫秒
     */
    @ReactMethod
    public void seekTo(int msec) {
        this.mCurrentPosition = msec;
        if (mPlayer != null && isPlaying()) {
            mPlayer.seekTo(msec);
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void startTimeTask() {
        mTimer = new Timer();
        mTimerTask = new TimerTask() {
            @Override
            public void run() {
                if (mPlayer != null && isPlaying()) {
                    updateMediaProgress();
                }
            }
        };
        mTimer.schedule(mTimerTask, 0, MEDIA_PROGRESS_UPDATE_PERIOD);
    }

    private void stopTimerTask() {
        if (mTimerTask == null || mTimer == null) {
            return;
        }
        mTimerTask.cancel();
        mTimer.cancel();
        mTimer.purge();
        mTimerTask = null;
        mTimer = null;
        this.mCurrentPosition = 0;
    }

    private void updateMediaProgress() {
        WritableMap map = Arguments.createMap();
        int currentPosition = mPlayer.getCurrentPosition();
        MediaPlayerModule.this.mCurrentPosition = currentPosition;
        int totalDuration = mPlayer.getDuration();//单位都是毫秒
        map.putInt("currentPosition", currentPosition);
        map.putInt("totalDuration", totalDuration);
        sendEvent(mContext, MEDIA_PROGRESS_UPDATE, map);
        Log.i("lpw", "currentPosition = " + currentPosition + "  totalDuration = " + totalDuration);
    }
}
