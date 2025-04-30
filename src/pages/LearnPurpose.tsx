import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LearnPurpose() {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Learn Purpose</h1>
          <p className="text-muted-foreground">
            Bite-sized, actionable content to help you grow and improve everyday
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your learning content will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}