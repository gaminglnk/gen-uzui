function YouTube(props) {
  const youtube = props.video;
  var embedHtml = {
    srcDoc: `<style>*{padding:0;margin:0;overflow:hidden}body,html{height:100%}img,svg{position:absolute;width:100%;top:0;bottom:0;margin:auto}svg{filter:drop-shadow(1px 1px 10px hsl(206.5, 70.7%, 8%));transition:250ms ease-in-out}body:hover svg{filter:drop-shadow(1px 1px 10px hsl(206.5, 0%, 10%));transform:scale(1.2)}</style>
  <a href='https://www.youtube.com/embed/${youtube}?autoplay=0&mute=1&amp;controls=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=3'>
    <img src='https://img.youtube.com/vi/${youtube}/hqdefault.jpg' alt='Thumbnail'>
    <?xml version="1.0" encoding="utf-8"?>
    <svg opacity="75%" width="84px" height="84px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path fill="#7676ff" d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"/>
    <path fill="#ffffff" d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"/>
    </svg>
  </a>`,
  };
  return (
    <iframe
      title="youtube-trailer"
      className="yt-trailer"
      loading="lazy"
      width="calc(100% - 16px)"
      allowFullScreen
      frameBorder={0}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      {...embedHtml}
    ></iframe>
  );
}

export default YouTube;
