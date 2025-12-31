import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif font-bold text-foreground mb-8 text-center">
            About Finetaraa Jewelry
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For over two decades, Finetaraa Jewelry has been synonymous with
                excellence in craftsmanship and timeless elegance. Founded by
                master jewelers with a passion for creating extraordinary
                pieces, we have established ourselves as a trusted name in
                luxury 18K gold jewelry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every piece in our collection tells a story of dedication,
                artistry, and the pursuit of perfection. From the selection of
                the finest gemstones to the intricate detailing of each design,
                we ensure that every creation meets the highest standards of
                quality and beauty.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                Our Craftsmanship
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Finetaraa Jewelry, we believe that true luxury lies in the
                details. Our skilled artisans combine traditional techniques
                with modern innovation to create pieces that are not just
                beautiful, but also built to last for generations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-accent p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-accent-foreground">
                    Premium Materials
                  </h3>
                  <p className="text-accent-foreground/80">
                    We use only 18K gold and ethically sourced gemstones in all
                    our creations.
                  </p>
                </div>
                <div className="bg-accent p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-accent-foreground">
                    Expert Artisans
                  </h3>
                  <p className="text-accent-foreground/80">
                    Our team consists of master jewelers with decades of
                    experience in fine jewelry making.
                  </p>
                </div>
                <div className="bg-accent p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-accent-foreground">
                    Quality Assurance
                  </h3>
                  <p className="text-accent-foreground/80">
                    Each piece undergoes rigorous quality checks to ensure it
                    meets our exacting standards.
                  </p>
                </div>
                <div className="bg-accent p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-accent-foreground">
                    Timeless Design
                  </h3>
                  <p className="text-accent-foreground/80">
                    Our designs blend classic elegance with contemporary style
                    for enduring beauty.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                Our Commitment
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to providing our customers with not just
                jewelry, but heirlooms that carry memories and emotions. Every
                piece we create is designed to celebrate life's most precious
                moments and to be treasured for years to come. Our dedication to
                sustainability, ethical sourcing, and customer satisfaction sets
                us apart in the world of fine jewelry.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
