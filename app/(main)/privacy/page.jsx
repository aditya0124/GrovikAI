"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card className="shadow-lg border rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-6">
            At <span className="font-semibold">AuthSetup</span>, we take your
            privacy seriously. This Privacy Policy explains how we collect, use,
            and safeguard your information when you use our application.
          </p>

          <Separator className="my-6" />

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may collect personal information such as your{" "}
              <span className="font-medium">name, email address</span>, and
              authentication details when you sign up or log in using{" "}
              <span className="font-medium">Google or GitHub</span>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The information we collect is used to provide secure
              authentication, enhance our services, and communicate with you
              when necessary.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              3. Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use industry-standard security measures to protect your data.
              However, no method of transmission over the internet or electronic
              storage is completely secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              4. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, feel free to
              reach out to us at{" "}
              <a
                href="mailto:support@example.com"
                className="text-primary hover:underline font-medium"
              >
                support@example.com
              </a>
              .
            </p>
          </section>

          <Separator className="my-6" />

          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} GrovikAI. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
