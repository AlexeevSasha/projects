import type { Reducer } from "react";
import React from "react";

type Action = {
  type: "logout";

  //     type: 'setMedia',
  //     payload: MediaData
  // } | {
  //     type: 'isLoading',
  // } | {
  //     type:"setPlayer",
  //     payload:Ref<HTMLAudioElement>|null
  // } | {
  //     type:"setAudioDuration",
  //     payload:number
  // } | {
  //     type:"setAudioTime",
  //     payload:number
  // } | {
  //     type:"setMediaJson",
  //     payload:WRec[]
  // } | {
  //     type:"playFrom",
  //     payload:number
  // } | {
  //     type:"updateWord",
  //     payload:{
  //         index:number,
  //         word:string
  //     }
  // } | {
  //     type:"userPlayFromSentenceStart",
  // } | {
  //     type:"userPlayFromWordStart",
  //     // } | {
  //     //     type:"userPlayPause",
  // } | {
  //     type:"userPlaySpeed",
  // } | {
  //     type:"userSkipForward",
  // } | {
  //     type:"userSkipBackward",
  // } | {
  //     type:"userVolumeUp",
  // } | {
  //     type:"userVolumeDown",
};
// | {
//     type:"setPlayed",
//     payload:number
// }

type State = {
  // mediaData?:MediaData,
  // state:EditorState,
  // error?:string,
  // player?:Ref<HTMLAudioElement>,
  // audioDuration?:number,
  // audioTime?:number,
  // mediaWords?:MediaWords[],
  // playedNow?:Set<number>,
  // currentWord?:number
  // wordTimes?:number[];
};

type Dispatch = (action: Action) => void;

const defaultState: State = {
  //     mediaData:undefined,
  //     state:"empty",
  //     playedNow:new Set(),
  //     currentWord:0
};
//
const defaultValue = {
  state: defaultState,
  dispatch: (action: Action) => {
    return;
  },
  //     setWord:(wordId,word)=> {
  //         return
  //     }
};

export const AppAccessContext = React.createContext<{
  state: State;
  dispatch: Dispatch;
  // setWord:(wordId,word)=>void
}>(defaultValue);

const AppAccessProvider = ({
  //                                        mediaId,
  children,
}: {
  //     mediaId?:string,
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer<Reducer<State, Action>>(
    appAccessReducer,
    defaultState
  );

  const value = {
    state,
    dispatch,
    // setWord:setWordV
  };
  //     const {mutate}=api.transcribe.setWord.useMutation();
  //     const {isLoading,data} =  api.transcribe.getData.useQuery({id:mediaId});
  //
  //
  //
  //     const {isLoading:transcriptionLoading,data:transcriptionData}=api.transcribe.getTranscript.useQuery({id:mediaId})
  //     // console.log(transcriptionData)
  //     // console.log({setWord})
  //
  //     const setWordV=(wordIndex:number,word:string)=>{
  //         dispatch({type:"updateWord",payload:{index:wordIndex,word}})
  //         return mutate({
  //             mediaId,
  //             wordIndex,
  //             word
  //         })
  //     }
  //
  //     // const {data:jsonData,isLoading:jsonLoading,...b}=useMediaSub(mediaId);
  //     // console.log({b})
  //     // console.log({jsonData,jsonLoading})
  //     // const a=useQuery({
  //     //
  //     // })
  //     // list_words_with_sent.json
  //
  //
  //     useEffect(()=>{
  //         if(typeof data==="undefined" || typeof transcriptionLoading==="undefined")
  //             dispatch({type:"isLoading"})
  //         else {
  //             // console.log({transcriptionData})
  //             dispatch({
  //                 type: "setMedia",
  //                 payload: data
  //             })
  //             dispatch({
  //                 type: "setMediaJson",
  //                 payload: transcriptionData  as WRec[]
  //             })
  //         }
  //     },[isLoading,mediaId,
  //         // jsonLoading,jsonData
  //         transcriptionLoading,transcriptionData
  //     ])
  //
  return (
    <AppAccessContext.Provider value={value}>
      i am access
      {children}i am end access
    </AppAccessContext.Provider>
  );
};
//
// export {
//     TranscriptionEditorProvider
// }

function appAccessReducer(state: State, action: Action): State {
  //     // console.log({action})
  switch (
    action.type
    //         case "updateWord":{
    //             // console.log("updateWordupdateWordupdateWordupdateWord")
    //             // const {}
    //             // type:"",
    //             //     payload:{
    //             //     index:number,
    //             //         word:string
    //             // }
    //
    //             const index=state.mediaWords.findIndex(w=>w.index==action.payload.index)
    //             const n=[...state.mediaWords];
    //             n[index].word=action.payload.word;
    //
    //             return {
    //                 ...state,
    //                 mediaWords:n
    //                 // audioDuration:action.payload
    //             }
    //         }
    //
    //         case "setMedia":{
    //             return {
    //                 ...state,
    //                 state:"active",
    //                 mediaData:{...action.payload}
    //             }
    //         }
    //         case "isLoading":{
    //             return {
    //                 ...state,
    //                 state:"loading"
    //             }
    //         }
    //         case "setPlayer":{
    //             return {
    //                 ...state,
    //                 player:action.payload
    //             }
    //         }
    //         case "setAudioTime":{
    //             // const word=setWord(action.payload,state.mediaWords)
    //             const timePlaying=Math.round(action.payload*10)-2
    //             const timePlayingMin=timePlaying-200;//- 20 sec
    //             const cwt=state.wordTimes.filter(wordTime=> wordTime>=timePlayingMin && wordTime<=timePlaying);
    //
    //
    //             // console.log({cwt});
    //             // let cw=state.currentWord;
    //             // const currentWord=word.wordIndex;
    //             // consolee.log({cwwt})
    //             if(cwt.length)
    //                 setTimeout(moveToWord.bind(null,cwt.pop()),0)
    //             // moveToWord(cwwt);
    //             // if(cwwt!==currentWord){
    //             //     cw=currentWord;
    //             //     // console.log({word})
    //             //     setTimeout(moveToWord.bind(null,word.wordTime),0)
    //             // }
    //
    //             // const cw=0;
    //             // se
    //
    //             // return state
    //             return {
    //                 ...state,
    //                 audioTime:action.payload,
    //                 // playedNow:new Set([...state.playedNow,Math.round(action.payload)]),
    //                 // currentWord:cw,//setWord(action.payload,state.mediaWords)
    //             }
    //         }
    //         // case "setPlayed":{
    //         //     return {
    //         //         ...state,
    //         //         playedNow:[...state.playedNow,Math.round(action.payload/10)]
    //         //     }
    //         // }
    //         case "setAudioDuration":{
    //             return {
    //                 ...state,
    //                 audioDuration:action.payload
    //             }
    //         }
    //         case "setMediaJson":{
    //             // console.log({p:action.payload})
    //             return {
    //                 ...state,
    //                 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
    //                 mediaWords:[...action.payload],
    //                 wordTimes:action.payload.map(({start})=>start)
    //                 // mediaWords:simplifyJsonData(action.payload)
    //             }
    //         }
    //         case "playFrom":{
    //             getPlayer(state).currentTime = action.payload-0.2
    //             void getPlayer(state).play()
    //             return state;//{
    //             //...state,
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
    //             // mediaWords:action.payload
    //             // mediaWords:simplifyJsonData(action.payload)
    //             //}
    //         }
    //         case "userPlayFromSentenceStart":{
    //             return state
    //         }
    //         case "userPlayFromWordStart":{
    //             return state
    //         }
    //         // case "userPlayPause":{
    //         //
    //         //     return state
    //         // }
    //         case "userPlaySpeed":{
    //             return state
    //         }
    //         case "userSkipForward":{
    //             getPlayer(state).currentTime += PLAYER_SKIP_SECONDS;
    //             return state
    //         }
    //         case "userSkipBackward":{
    //             // console.log(getPlayer(state).ontimeupdate=(a)=>{
    //             //     console.log(Math.round(a.timeStamp*10))
    //             // })
    //             getPlayer(state).currentTime -= PLAYER_SKIP_SECONDS;
    //             // console.log(getPlayer(state))
    //             // .fastSeek(5);
    //             // if(getPlayer(state).onplaying
    //             //     +VOLUME_STEP<=1)
    //             //     getPlayer(state).volume+=VOLUME_STEP
    //             return state
    //         }
    //         case "userVolumeUp":{
    //             if(getPlayer(state).volume+VOLUME_STEP<=1)
    //                 getPlayer(state).volume+=VOLUME_STEP
    //             return state
    //         }
    //         case "userVolumeDown":{
    //             if(getPlayer(state).volume-VOLUME_STEP>=0)
    //                 getPlayer(state).volume-=VOLUME_STEP
    //             return state
    //         }
    //         default: {
    //             console.log(action)
    //             throw new Error(`Unhandled action type: `+JSON.stringify(action))
    //         }
  ) {
  }
  return { ...state };
}

export default {
  TranscriptionEditorProvider: AppAccessProvider,
};

// import React, {Reducer, Ref, useEffect, useMemo} from "react";
// import {api} from "../../../utils/api";
// import {useQuery} from "@tanstack/react-query";
// import axios from "axios";
// import {WRec} from "../../../server/api/routers/transcribe";
//
// type MediaData={
//     id?:string
// }
//

//
// type EditorState="empty"|"loading"|"active"|"error"
//
// //todo add type
// // type MediaWords= Map<number, {
// //     word:string,
// //     index:number,
// //     firstWord:boolean
// // }>;
// type MediaWords=WRec
//
//

//

//

//
//
// export const moveToWord = (wordNr:number):void => {
//     // console.log(wordNr)
//     const id=`#tWord${wordNr}`
//     // console.log({id})
//     const section = document.querySelector(id);
//     // console.log({section})
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     section?.focus();
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     section?.select();
//     section?.scrollIntoView( { behavior: 'smooth', block: 'center' } );
// }
//
// // const getMediaSubById = async (mediaId:string):Promise<string> => {
// //     const req = await axios.get(
// //         `/uploads/${mediaId}/list_words_with_sent.json`
// //     );
// //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
// //     return req.data ;
// // };
//
// // function useMediaSub(mediaId:string) {
// //     return useQuery({
// //         queryKey: [],
// //         queryFn: () => getMediaSubById(mediaId),
// //         enabled: !!mediaId,
// //
// //     });
// // }
//
// type SrtData = {
//     end_time:string, //"0:00:09.300000"
//     firstWord:boolean,
//     index:number,
//     sent_start:number,// 8.2 subtitle start
//     start_time:number,//11.2 audio start
//     word:string
// }
//
//
//
// const simplifyJsonData=(jsonString:string)=>{
//     // console.log(jsonString)
//     const data=JSON.parse(jsonString??"[]") as SrtData[]
//     const simplified= new Map();
//     for (const {
//         word,
//         index,
//         firstWord,
//         start_time,
//         // ...rec
//     } of data){
//         simplified.set(Math.round(start_time*10),{
//             word,
//             firstWord,
//             index
//         });
//     }
//     // console.log({simplified})
//     return simplified;
// }
//
// const setWord=(i,words)=>{
//     const time=Math.round(i*10)
//     const times=words.map(({start}:{start:number})=>start) as number[];
//     const wordsPlayed=times.filter(wordTime=>wordTime<=time);
//     const wordIndex=wordsPlayed.length;
//     // console.log(wordIndex)
//     const wordTime=wordsPlayed.slice(-1)[0]??null
//     // console.log(lastWord)
//     // console.log(words)
//     // const lastWord=words[wordsPlayed.length]
//     // console.log(wordsPlayed.length,lastWord)
//     // const times=words.keys();
//     // times.filter(time=>time<i)
//     // console.log({times})
//     // console.log(time);
//     return {
//         wordIndex,
//         wordTime
//     };
// }
//
// const VOLUME_STEP=0.05;
// const PLAYER_SKIP_SECONDS=2.5;
// export const getPlayer=(state:any)=>{
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     return state.player?.current.audio.current as HTMLAudioElement
// }
//

//
