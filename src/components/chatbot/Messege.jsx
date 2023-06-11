export const Messege = (props) => {
    return (
        <div class="container-msg">
            <div class={props.class}>
                <p class="message-content">{props.text}</p>
                <div class="message-timestamp-left">{props.user}</div>
            </div>
        </div>
    )
  }