import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
    <main className="min-h-screen flex flex-col ">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Liturgical Schedule</Link>
            </div>
            <AuthButton />
          </div>
        </nav>

        <div className="flex flex-col">

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Badge variant="outline" className="mb-6 bg-indigo-100 text-indigo-800 px-4 py-2 border-indigo-200 hover:bg-indigo-200 hover:text-indigo-900">
                  Trusted by Catholic Priests Worldwide
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Create Meaningful Homilies
                  <span className="block text-indigo-600">For Every Context</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  The comprehensive platform for Catholic preachers to create contextual, high-quality homilies efficiently
                  across different audiences and settings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/create">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Creating Homilies
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

          {/* Features Section */}
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Everything You Need for Effective Preaching
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Built specifically for Catholic priests, with deep integration of liturgical resources and Church
                  teaching.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon
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
                  )
                })}
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple 6-Step Workflow</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From liturgical readings to finished homily in minutes, not hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              </div>
            </div>
          </section>

          {/* Multi-Context Section */}
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">One Weekend, Multiple Contexts</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Many priests serve diverse congregations. Create different homilies for the same weekend that speak to
                    each community&apos;s unique needs and cultural context.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-6 h-6 text-indigo-600" />
                      <span className="text-gray-700">English and Spanish-speaking communities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-indigo-600" />
                      <span className="text-gray-700">Student masses and parish communities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-6 h-6 text-indigo-600" />
                      <span className="text-gray-700">Special events: weddings, funerals, celebrations</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">December 22, 2024</span>
                        <Badge variant="secondary">4th Sunday of Advent</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">English Parish:</span>
                          <span className="text-green-600 font-medium">Complete</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Spanish Community:</span>
                          <span className="text-blue-600 font-medium">In Progress</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Student Mass:</span>
                          <span className="text-gray-400">Planned</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 sm:py-24 bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Priests Choose Homily.Build</h2>
                <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                  Join hundreds of Catholic priests who have transformed their homily preparation process.
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

          {/* Testimonials Section */}
          <section className="py-16 sm:py-24 bg-gray-50">
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
          </section>

          {/* CTA Section */}
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

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">Homily.Build</span>
                  </div>
                  <p className="text-gray-400">
                    Empowering Catholic priests with AI-powered tools for meaningful, contextual homily creation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Product</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="#" className="hover:text-white">
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Demo
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="#" className="hover:text-white">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Faith Stories
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Liturgical Calendar
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Organization</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="#" className="hover:text-white">
                        About Lolek Productions
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Catholic Tech Partnership
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Lolek Productions. All rights reserved. Built with ❤️ for the Catholic Church.</p>
              </div>
            </div>
            <ThemeSwitcher />
          </footer>
        </div>
    </main>
  );
}
