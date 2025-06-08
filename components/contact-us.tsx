"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Star, Sparkles } from "lucide-react"

export default function ContactUs() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            Let's Chat!
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              We Love Hearing From You! 💬
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-bold">
            Questions? Ideas? Feedback? Our magical team is here to help make AI learning amazing for your child! ✨
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 bg-gradient-to-br from-purple-100 to-purple-200 border-0 shadow-xl max-w-lg w-full">
            <CardHeader>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800 font-black">📧 Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6 font-bold">
                Get help with any questions about KaiD, technical support, feedback, partnership inquiries, or general
                questions!
              </p>
              <Button
                variant="outline"
                className="w-full border-2 border-purple-400 text-purple-700 hover:bg-purple-50 font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                onClick={() => (window.location.href = "mailto:help.kaid@gmail.com")}
              >
                help.kaid@gmail.com
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-center text-gray-800 mb-8 flex items-center justify-center">
            <Star className="w-8 h-8 text-yellow-500 mr-3" />
            Frequently Asked Questions
            <Star className="w-8 h-8 text-yellow-500 ml-3" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 shadow-lg">
              <h4 className="font-black text-gray-800 mb-3 text-lg flex items-center">
                <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                Is KaiD safe for my child? 🔒
              </h4>
              <p className="text-gray-700 font-medium">
                KaiD is designed with child safety as our #1 priority. We're COPPA compliant and use advanced content
                filtering to ensure all AI interactions are age-appropriate and educational.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg">
              <h4 className="font-black text-gray-800 mb-3 text-lg flex items-center">
                <Sparkles className="w-5 h-5 text-green-500 mr-2" />
                What age is KaiD perfect for? 🎂
              </h4>
              <p className="text-gray-700 font-medium">
                KaiD is specially designed for children aged 5-10 years, with content and interactions tailored to be
                engaging, educational, and developmentally appropriate for this magical age range.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-2xl p-6 shadow-lg">
              <h4 className="font-black text-gray-800 mb-3 text-lg flex items-center">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                How can I start using KaiD? 🚀
              </h4>
              <p className="text-gray-700 font-medium">
                KaiD is ready now! You can start your child's AI learning adventure immediately by visiting our app.
                Sign up to get the full experience and join our growing community of young AI creators!
              </p>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg">
              <h4 className="font-black text-gray-800 mb-3 text-lg flex items-center">
                <Sparkles className="w-5 h-5 text-pink-500 mr-2" />
                Can I track my child's progress? 📊
              </h4>
              <p className="text-gray-700 font-medium">
                Yes! KaiD includes a comprehensive parent dashboard where you can track your child's learning journey,
                view their amazing creations, and see which AI concepts they're mastering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
