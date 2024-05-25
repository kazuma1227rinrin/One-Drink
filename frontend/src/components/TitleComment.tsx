import {styled} from "styled-components";

export const TitleComment =()=>{
    return(
        <Sp>コメント編集画面</Sp>
    )
}

const Sp = styled.p`
font-weight: bold; /* 太字にする */
font-size: 24px; /* 文字の大きさ */
text-align: center; /* テキストを中央に配置する */
margin: 0; /* 上下のマージンをなくす */
padding: 20px; /* 余白を追加する */
`