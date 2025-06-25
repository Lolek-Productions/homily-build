import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Users,
  Lightbulb,
  Target,
  MessageSquare,
  CheckCircle,
  Star,
  Globe,
  Heart,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This ensures the page is dynamically rendered due to cookie usage
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {

  const features = [
    {
      icon: Calendar,
      title: "Liturgical Integration",
      description: "Seamlessly access liturgical readings and calendar with proper seasonal context.",
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Themes",
      description: "Generate meaningful themes based on scripture with intelligent AI assistance.",
    },
    {
      icon: Users,
      title: "Multi-Context Support",
      description: "Create different homilies for diverse audiences - parishes, students, special events.",
    },
    {
      icon: MessageSquare,
      title: "Faith Stories Database",
      description: "Access curated stories from Butler's Lives of the Saints and other Catholic sources.",
    },
    {
      icon: Target,
      title: "Structured Workflow",
      description: "Follow a proven 6-step process from readings to final homily completion.",
    },
    {
      icon: BookOpen,
      title: "Magisterium Resources",
      description: "Integrate Catechism and Church teaching directly into your homily development.",
    },
  ]

  const workflow = [
    { step: 1, title: "Select Weekend & Readings", description: "Choose liturgical readings from the calendar" },
    { step: 2, title: "AI Theme Generation", description: "Get 3 AI-suggested themes based on scripture" },
    { step: 3, title: "Define Context", description: "Select your audience and preaching setting" },
    { step: 4, title: "Develop Points", description: "Build key points with Magisterium support" },
    { step: 5, title: "Add Stories", description: "Integrate relevant faith stories and examples" },
    { step: 6, title: "Final Review", description: "Complete and save your contextual homily" },
  ]

  const testimonials = [
    {
      name: "Fr. Michael Rodriguez",
      parish: "St. Mary's Parish",
      quote:
        "Homily.Build has transformed my preparation time. I can now create meaningful homilies for both my English and Spanish communities efficiently.",
      rating: 5,
    },
    {
      name: "Fr. David Chen",
      parish: "University Chapel",
      quote:
        "The contextual approach is brilliant. My student homilies are now more engaging while my parish homilies maintain traditional depth.",
      rating: 5,
    },
    {
      name: "Fr. Antonio Silva",
      parish: "Sacred Heart Church",
      quote: "The integration with Catholic resources and the story database saves me hours of research every week.",
      rating: 5,
    },
  ]

  const benefits = [
    "Save 3-5 hours per week on homily preparation",
    "Create contextually appropriate content for diverse audiences",
    "Access authentic Catholic stories and teaching resources",
    "Maintain theological accuracy with Magisterium integration",
    "Plan and organize homilies across the liturgical year",
    "Build a personal library of homilies and themes",
  ]


  return (
    <main className="min-h-screen flex flex-col">
      <PublicHeader currentPath="/" />
      <div className="flex flex-col">

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                {/* <Badge variant="outline" className="mb-6 bg-indigo-100 text-indigo-800 px-4 py-2 border-indigo-200 hover:bg-indigo-200 hover:text-indigo-900">
                  Trusted by Catholic Priests Worldwide
                </Badge> */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Create Meaningful Homilies
                  <span className="block text-indigo-600">For Every Context</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  The comprehensive platform for Catholic preachers to create contextual, high-quality homilies efficiently
                  across different audiences and settings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="w-full sm:w-auto">
                      Create Your Free Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  {/* <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Watch Demo
                  </Button> */}
                </div>
                {/* <p className="text-sm text-gray-500 mt-4">Free trial • No credit card required</p> */}
              </div>
            </div>
          </section>

          {/* Features Section - Commented Out */}
          {/* <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Everything You Need for Effective Preaching
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Built specifically for Catholic priests to use with liturgical resources and Church
                  teaching.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section> */}

          {/* Workflow Section */}
          <section className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple 6-Step Workflow</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Transform your homily preparation with our streamlined process: from selecting readings and defining key themes to crafting engaging questions and finalizing your message—all designed to help you create meaningful, contextual homilies efficiently.
                </p>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                    See How It Works
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>           

              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workflow.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {item.step}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    {index < workflow.length - 1 && (
                      <div className="hidden lg:block absolute top-5 left-full w-8 h-0.5 bg-gray-300 transform -translate-x-4"></div>
                    )}
                  </div>
                ))}
              </div> */}
            </div>
          </section>

          {/* Multi-Context Section */}
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Designed to Fit your Audience</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Many priests serve diverse congregations. With Homily Build, you can quickly create different homilies for the same weekend. Changing a few parameters will enable you to speak to each community's unique needs and cultural context.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Globe className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Multilingual Support</h3>
                  </div>
                  <p className="text-gray-600">Create homilies for English and Spanish-speaking communities with ease.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Diverse Audiences</h3>
                  </div>
                  <p className="text-gray-600">Tailor your message for student masses, parish communities, and more.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Heart className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Special Occasions</h3>
                  </div>
                  <p className="text-gray-600">Perfect for weddings, funerals, and other special celebrations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section - Commented Out
          <section className="py-16 sm:py-24 bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Priests Choose Homily.Build</h2>
                <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                  Join other Catholic priests and transform your homily preparation process!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-white text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          */}

          {/* Testimonials Section */}
          {/* /* <section className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted by Catholic Priests</h2>
                <p className="text-xl text-gray-600">See what fellow priests are saying about Homily.Build</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.parish}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section> */}

          {/* CTA Section - Commented Out
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Homily Preparation?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join the growing community of Catholic priests using AI-powered tools to create more meaningful homilies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Your Free Trial
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                14-day free trial • Cancel anytime • Dedicated support for clergy
              </p>
            </div>
          </section>
          */}

        {/* Footer */}
        <PublicFooter />
      </div>
    </main>
  );
}
