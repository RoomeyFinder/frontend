import localforage from "localforage"


export default function useCreateLocalForageInstance(instanceName: string){
  return localforage.createInstance({
    name: instanceName
  })
}