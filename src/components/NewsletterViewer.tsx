import { Newsletter } from "@/lib/newsletterApi";
import { resolveMediaUrl } from "@/lib/mediaUrl";

interface NewsletterViewerProps {
  newsletter: Newsletter;
}

const NewsletterViewer = ({ newsletter }: NewsletterViewerProps) => {
  const hasArticleContent = (article?: { image?: string; title?: string; description?: string; link?: string }) =>
    Boolean(
      article &&
        (
          article.image?.trim() ||
          article.title?.trim() ||
          article.description?.trim() ||
          article.link?.trim()
        )
    );

  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: "#f5f5f5", fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Main Wrapper */}
      <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ backgroundColor: "#f5f5f5" }}>
        <tr>
          <td align="center" style={{ padding: "20px 0" }}>
            {/* Email Container (600px max width) */}
            <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>
              
              {/* ==================== 1. HEADER SECTION ==================== */}
              <tr>
                <td style={{ padding: 0 }}>
                  {/* Banner Image */}
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td style={{ padding: 0 }}>
                        <img 
                          src={resolveMediaUrl(newsletter.bannerImageUrl)} 
                          alt="ET TECH X Newsletter Banner" 
                          width="600" 
                          style={{ display: "block", width: "100%", maxWidth: "600px", height: "auto", border: 0, outline: "none", textDecoration: "none" }} 
                        />
                      </td>
                    </tr>
                  </table>
                  {/* Newsletter Title and Issue Info */}
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ backgroundColor: "#0B1C2D" }}>
                    <tr>
                      <td align="center" style={{ padding: "30px 20px" }}>
                        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          ET TECH X Newsletter
                        </h1>
                        <p style={{ margin: "10px 0 0 0", fontSize: "14px", color: "#cccccc", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          Issue {newsletter.issueNumber} | {newsletter.month} {newsletter.year}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* ==================== 2. MAIN BANNER CONTENT ==================== */}
              <tr>
                <td style={{ padding: "40px 30px", backgroundColor: "#ffffff" }}>
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td align="center" style={{ paddingBottom: "20px" }}>
                        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.4 }}>
                          {newsletter.mainBannerHeading}
                        </h2>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style={{ paddingBottom: "30px" }}>
                        <p style={{ margin: 0, fontSize: "16px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.6, maxWidth: "500px" }}>
                          {newsletter.mainBannerDescription}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                          <tr>
                            <td align="center" style={{ backgroundColor: "#0B1C2D", borderRadius: "8px" }}>
                              <a 
                                href={newsletter.mainBannerCtaLink} 
                                style={{ display: "inline-block", padding: "14px 32px", fontSize: "16px", fontWeight: "bold", color: "#ffffff", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: "8px" }}
                              >
                                {newsletter.mainBannerCtaText}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* ==================== 3. FEATURED ARTICLES SECTION ==================== */}
              <tr>
                <td style={{ padding: "0 30px 40px 30px", backgroundColor: "#ffffff" }}>
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td align="center" style={{ paddingBottom: "30px" }}>
                        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          Featured Articles
                        </h2>
                      </td>
                    </tr>
                  </table>
                  
                  {/* Article 1 */}
                  {hasArticleContent(newsletter.article1) && (
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            {newsletter.article1.image?.trim() && (
                              <tr>
                                <td style={{ paddingBottom: "15px" }}>
                                <img src={resolveMediaUrl(newsletter.article1.image)} alt={newsletter.article1.title} width="100%" style={{ display: "block", width: "100%", maxWidth: "540px", height: "auto", border: 0, borderRadius: "8px" }} />
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td style={{ paddingBottom: "10px" }}>
                                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.3 }}>
                                  {newsletter.article1.title}
                                </h3>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: "15px" }}>
                                <p style={{ margin: 0, fontSize: "15px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.6 }}>
                                  {newsletter.article1.description}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                                  <tr>
                                    <td align="left" style={{ backgroundColor: "#0B1C2D", borderRadius: "6px" }}>
                                      <a href={newsletter.article1.link} style={{ display: "inline-block", padding: "10px 24px", fontSize: "14px", fontWeight: "bold", color: "#ffffff", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: "6px" }}>
                                        Read More
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  )}

                  {/* Article 2 */}
                  {hasArticleContent(newsletter.article2) && (
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            {newsletter.article2.image?.trim() && (
                              <tr>
                                <td style={{ paddingBottom: "15px" }}>
                                <img src={resolveMediaUrl(newsletter.article2.image)} alt={newsletter.article2.title} width="100%" style={{ display: "block", width: "100%", maxWidth: "540px", height: "auto", border: 0, borderRadius: "8px" }} />
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td style={{ paddingBottom: "10px" }}>
                                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.3 }}>
                                  {newsletter.article2.title}
                                </h3>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: "15px" }}>
                                <p style={{ margin: 0, fontSize: "15px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.6 }}>
                                  {newsletter.article2.description}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                                  <tr>
                                    <td align="left" style={{ backgroundColor: "#0B1C2D", borderRadius: "6px" }}>
                                      <a href={newsletter.article2.link} style={{ display: "inline-block", padding: "10px 24px", fontSize: "14px", fontWeight: "bold", color: "#ffffff", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: "6px" }}>
                                        Read More
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  )}

                  {/* Article 3 */}
                  {hasArticleContent(newsletter.article3) && (
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            {newsletter.article3.image?.trim() && (
                              <tr>
                                <td style={{ paddingBottom: "15px" }}>
                                <img src={resolveMediaUrl(newsletter.article3.image)} alt={newsletter.article3.title} width="100%" style={{ display: "block", width: "100%", maxWidth: "540px", height: "auto", border: 0, borderRadius: "8px" }} />
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td style={{ paddingBottom: "10px" }}>
                                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.3 }}>
                                  {newsletter.article3.title}
                                </h3>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: "15px" }}>
                                <p style={{ margin: 0, fontSize: "15px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.6 }}>
                                  {newsletter.article3.description}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                                  <tr>
                                    <td align="left" style={{ backgroundColor: "#0B1C2D", borderRadius: "6px" }}>
                                      <a href={newsletter.article3.link} style={{ display: "inline-block", padding: "10px 24px", fontSize: "14px", fontWeight: "bold", color: "#ffffff", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: "6px" }}>
                                        Read More
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  )}
                </td>
              </tr>

              {/* ==================== 4. OPTIONAL ADVERTISEMENT SECTION ==================== */}
              {newsletter.ad?.enabled && newsletter.ad.image && (
                <tr>
                  <td style={{ padding: "0 30px 40px 30px", backgroundColor: "#ffffff" }}>
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
                      <tr>
                        <td align="center" style={{ padding: "20px" }}>
                          <a href={newsletter.ad.link || "#"} style={{ display: "block", textDecoration: "none" }}>
                            <img src={resolveMediaUrl(newsletter.ad.image)} alt="Advertisement" width="100%" style={{ display: "block", width: "100%", maxWidth: "540px", height: "auto", border: 0, borderRadius: "8px" }} />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              )}

              {/* ==================== 5. MULTIPLE ARTICLES SECTION ==================== */}
              {newsletter.articles && newsletter.articles.filter(hasArticleContent).length > 0 && newsletter.articles.filter(hasArticleContent).map((article, index) => (
                <tr key={index}>
                  <td style={{ padding: "0 30px 40px 30px", backgroundColor: "#ffffff" }}>
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            <tr>
                              <td width={article.image?.trim() ? "40%" : "0%"} style={{ paddingRight: article.image?.trim() ? "15px" : "0", paddingBottom: "15px", verticalAlign: "top", display: article.image?.trim() ? "table-cell" : "none" }}>
                                <img src={resolveMediaUrl(article.image)} alt={article.title} width="100%" style={{ display: "block", width: "100%", maxWidth: "200px", height: "auto", border: 0, borderRadius: "8px" }} />
                              </td>
                              <td width={article.image?.trim() ? "60%" : "100%"} style={{ verticalAlign: "top" }}>
                                <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.3 }}>
                                  {article.title}
                                </h3>
                                <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.6 }}>
                                  {article.description}
                                </p>
                                <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                                  <tr>
                                    <td align="left" style={{ backgroundColor: "#0B1C2D", borderRadius: "6px" }}>
                                      <a href={article.link} style={{ display: "inline-block", padding: "8px 20px", fontSize: "13px", fontWeight: "bold", color: "#ffffff", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: "6px" }}>
                                        Read More
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              ))}

              {/* ==================== 6. OPTIONAL YOUTUBE SECTION ==================== */}
              {newsletter.youtube?.enabled && newsletter.youtube.thumbnail && (
                <tr>
                  <td style={{ padding: "0 30px 40px 30px", backgroundColor: "#ffffff" }}>
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
                      <tr>
                        <td align="center" style={{ padding: "30px 20px" }}>
                          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            <tr>
                              <td align="center" style={{ paddingBottom: "20px" }}>
                                <a href={newsletter.youtube.link || "#"} style={{ display: "block", textDecoration: "none" }}>
                                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                                    <tr>
                                      <td align="center">
                                        <img src={resolveMediaUrl(newsletter.youtube.thumbnail)} alt={newsletter.youtube.title} width="100%" style={{ display: "block", width: "100%", maxWidth: "540px", height: "auto", border: 0, borderRadius: "8px" }} />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="center" style={{ paddingTop: "15px" }}>
                                        <table role="presentation" cellPadding="0" cellSpacing="0" border={0} style={{ backgroundColor: "#0B1C2D", borderRadius: "50%", width: "60px", height: "60px" }}>
                                          <tr>
                                            <td align="center" valign="middle" style={{ height: "60px" }}>
                                              <span style={{ color: "#ffffff", fontSize: "24px", fontFamily: "Arial, Helvetica, sans-serif" }}>▶</span>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style={{ paddingBottom: "20px" }}>
                                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                  {newsletter.youtube.title}
                                </h3>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                                  <tr>
                                    <td align="center" style={{ backgroundColor: "#0B1C2D", borderRadius: "8px" }}>
                                      <a href={newsletter.youtube.link || "#"} style={{ display: "inline-block", padding: "12px 28px", fontSize: "15px", fontWeight: "bold", color: "#ffffff", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: "8px" }}>
                                        Watch Now
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              )}

              {/* ==================== 7. THANK YOU + FEEDBACK SECTION ==================== */}
              <tr>
                <td style={{ padding: "40px 30px", backgroundColor: "#f9f9f9" }}>
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td align="center" style={{ paddingBottom: "20px" }}>
                        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          Thank You for Reading!
                        </h2>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style={{ paddingBottom: "25px" }}>
                        <p style={{ margin: 0, fontSize: "15px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.6 }}>
                          We value your feedback and would love to hear from you.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <table role="presentation" cellPadding="0" cellSpacing="0" border={0}>
                          <tr>
                            <td align="center" style={{ backgroundColor: "#0B1C2D", borderRadius: "8px" }}>
                              <a href={newsletter.feedbackLink} style={{ display: "inline-block", padding: "12px 28px", fontSize: "15px", fontWeight: "bold", color: "#ffffff", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", borderRadius: "8px" }}>
                                Share Your Feedback
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* ==================== 8. OFFICE ADDRESS & CONTACT SECTION ==================== */}
              <tr>
                <td style={{ padding: "40px 30px", backgroundColor: "#ffffff", borderTop: "1px solid #e5e5e5" }}>
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td align="center" style={{ paddingBottom: "20px" }}>
                        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#0B1C2D", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          Contact Us
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style={{ paddingBottom: "10px" }}>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.6 }}>
                          {newsletter.officeAddress}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style={{ paddingBottom: "10px" }}>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          <a href={`tel:${newsletter.contactNumber}`} style={{ color: "#0B1C2D", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif" }}>
                            {newsletter.contactNumber}
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <p style={{ margin: 0, fontSize: "14px", color: "#666666", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          <a href={newsletter.websiteLink} style={{ color: "#0B1C2D", textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif" }}>
                            {newsletter.websiteLink}
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* ==================== 9. DISCLAIMER SECTION ==================== */}
              <tr>
                <td style={{ padding: "20px 30px", backgroundColor: "#f9f9f9", borderTop: "1px solid #e5e5e5" }}>
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td align="center">
                        <p style={{ margin: 0, fontSize: "11px", color: "#999999", fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.5 }}>
                          {newsletter.disclaimerText}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* ==================== 10. FOOTER ==================== */}
              <tr>
                <td style={{ padding: "30px", backgroundColor: "#0B1C2D" }}>
                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tr>
                      <td align="center" style={{ paddingBottom: "20px" }}>
                        <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          ET TECH X
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style={{ paddingBottom: "20px" }}>
                        {/* Social Media Icons */}
                        <table role="presentation" cellPadding="0" cellSpacing="0" border={0} align="center">
                          <tr>
                            <td style={{ padding: "0 10px" }}>
                              <a href={newsletter.instagramLink} style={{ display: "inline-block", width: "40px", height: "40px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "50%", textAlign: "center", lineHeight: "40px", textDecoration: "none" }}>
                                <span style={{ color: "#ffffff", fontSize: "18px", fontFamily: "Arial, Helvetica, sans-serif" }}>📷</span>
                              </a>
                            </td>
                            <td style={{ padding: "0 10px" }}>
                              <a href={newsletter.linkedinLink} style={{ display: "inline-block", width: "40px", height: "40px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "50%", textAlign: "center", lineHeight: "40px", textDecoration: "none" }}>
                                <span style={{ color: "#ffffff", fontSize: "18px", fontFamily: "Arial, Helvetica, sans-serif" }}>💼</span>
                              </a>
                            </td>
                            <td style={{ padding: "0 10px" }}>
                              <a href={newsletter.youtubeChannelLink} style={{ display: "inline-block", width: "40px", height: "40px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "50%", textAlign: "center", lineHeight: "40px", textDecoration: "none" }}>
                                <span style={{ color: "#ffffff", fontSize: "18px", fontFamily: "Arial, Helvetica, sans-serif" }}>▶</span>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <p style={{ margin: 0, fontSize: "12px", color: "#cccccc", fontFamily: "Arial, Helvetica, sans-serif" }}>
                          © {newsletter.year} ET TECH X. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default NewsletterViewer;
