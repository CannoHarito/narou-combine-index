const apiUrlBase = "https://api.syosetu.com/novelapi/api"
const urlBase = "https://ncode.syosetu.com";

export async function shouldCombine(ncode: string): Promise<boolean> {
    const data = await fetch(`${apiUrlBase}/?out=json&of=nt-ga&ncode=${ncode}`).then(r => r.json());
    const { noveltype, general_all_no } = data?.[1];
    return noveltype == 1 && general_all_no > 100;
}

export async function combineIndex(ncode: string): Promise<string> {
    const url = `${urlBase}/${ncode}/`;
    const orig = await fetch(url).then(r => r.text());
    if (orig.match(/novelview_pager-box/)) {
        const html = orig.replaceAll(/<div class="novelview_pager-box.+?novelview_pager-box -->/gs, "");
        const pagedIndex = await getPagedIndex(orig);
        return html.replace(`</div><!--index_box-->`, `${pagedIndex}$&`);
    }
    throw new Error("has no div.novelview_pager-box")
}

async function getPagedIndex(prevHtml: string): Promise<string> {
    const match = prevHtml.match(/"([^"]+)" class="novelview_pager-next/);
    if (match) {
        const url = `${urlBase}${match[1]}`;
        const html = await fetch(url).then(r => r.text());
        const pagedIndex = html.match(/<div class="index_box">\n(.+)<\/div><!--index_box-->/s);
        return (`${pagedIndex?.[1]}${await getPagedIndex(html)}`);
    }
    return "";
}