import { Layout, ContentList } from "@/component";

export default function Page() {
    return (
        <Layout>
            <ContentList prefix="move" pageLimit={20} />
        </Layout>
    );
}
