export default function() {
  return new Promise((resolve, reject) => {
    const script: any = document.createElement("script")
    script.src = "https://sdk.scdn.co/spotify-player.js"

    script.onreadystatechange = script.onload = () => {
      const interval = setInterval(function() {
        console.log(interval);
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          clearInterval(interval)
          resolve("Loaded successfuly")
        }
      }, 1000)
    }

    script.onerror = () => {
      reject("Failed to load")
    }
    document.getElementsByTagName("head")[0].appendChild(script)
  })
}
