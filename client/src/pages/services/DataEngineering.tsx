import { ArrowRight, Database, TrendingUp, Zap, Shield, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function DataEngineering() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Database className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Data Engineering Services</h1>
            <p className="text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Build scalable data infrastructure, real-time analytics pipelines, and modern data platforms that transform your business intelligence capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-get-started">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-700 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300" data-testid="button-view-projects">
                  View Our Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Data Engineering Expertise</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We design and build modern data infrastructure that scales with your business, from real-time streaming pipelines to advanced analytics platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Real-Time Data Pipelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Build high-throughput, low-latency data pipelines using Apache Kafka, Apache Flink, and modern streaming technologies for real-time analytics.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Stream processing with Apache Kafka
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Real-time analytics with Apache Flink
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Event-driven architecture
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Data Warehousing & Lakes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Design and implement modern data warehouses and data lakes using Snowflake, Databricks, and cloud-native solutions for centralized analytics.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Snowflake data warehousing
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Databricks lakehouse architecture
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Delta Lake for data reliability
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-green-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">ETL/ELT Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Automate data transformation workflows using Apache Airflow, dbt, and modern data orchestration tools for reliable data processing.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Apache Airflow orchestration
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      dbt for data transformation
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Automated data quality checks
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Cloud Data Platforms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Deploy and manage scalable data platforms on AWS, Azure, and GCP with infrastructure as code and automated scaling capabilities.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Multi-cloud data solutions
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Terraform infrastructure
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Kubernetes orchestration
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-red-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Data Governance & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Implement comprehensive data governance frameworks with security, compliance, and data lineage tracking for enterprise-grade solutions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Data lineage and cataloging
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      GDPR/CCPA compliance
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Role-based access control
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Analytics & BI Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Connect your data infrastructure to modern BI tools and create self-service analytics platforms for business stakeholders.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Tableau & Power BI integration
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Self-service analytics platforms
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Real-time dashboards
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Data Engineering Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We leverage cutting-edge technologies and frameworks to build robust, scalable data solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Apache Spark', 'Apache Kafka', 'Apache Airflow', 'Snowflake', 'dbt', 'Databricks',
              'Apache Flink', 'AWS Glue', 'Kubernetes', 'Terraform', 'Elasticsearch', 'Pandas'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:bg-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm">{tech.split(' ')[0].substring(0, 2).toUpperCase()}</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{tech}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Data Infrastructure?</h2>
            <p className="text-xl text-orange-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Let's discuss how our data engineering expertise can help you build scalable, reliable data pipelines that drive business insights and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-schedule-consultation">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-700 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300" data-testid="button-view-case-studies">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}