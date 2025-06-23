// export => 한 모듈 (한 .ts 파일) 여러개를 빼낼 수 있다.
// export default => 한 모듈에 하나만 뺄 수 있다.

export default interface IHeaderLeft {
    href: string,
    title: string,
}

export class CHeaderLeft implements IHeaderLeft {
    href: string;
    title: string;

    constructor(href: string, title: string){
        this.href = href;
        this.title = title;
    }
}