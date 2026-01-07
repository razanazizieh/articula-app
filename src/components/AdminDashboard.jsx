import "../components/css/UserDashboard.css";
import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ArticleServices } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    users: [],
    pager: {},
    genderStats: { male: 0, female: 0, other: 0 },
  });

  const [allUsersForStats, setAllUsersForStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ArticleServices.getUsersList({ page, search: searchTerm }).then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [page, searchTerm]);

  useEffect(() => {
    ArticleServices.getUsersList({ page: 0, limit: 1000 }).then((res) => {
      if (res && res.users) {
        setAllUsersForStats(res.users);
      }
    });
  }, []);

  const lineChartData = useMemo(() => {
    const monthsMap = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    allUsersForStats.forEach((user) => {
      let label = "Jan 2025";
      if (user.displayDate && user.displayDate.includes("/")) {
        const parts = user.displayDate.split("/");
        const monthIndex = parseInt(parts[0]) - 1;
        const year = parts[2];
        label = `${monthNames[monthIndex]} ${year}`;
      }
      monthsMap[label] = (monthsMap[label] || 0) + 1;
    });
    return Object.keys(monthsMap)
      .map((label) => ({
        name: label,
        count: monthsMap[label],
        sortKey: new Date(label).getTime(),
      }))
      .sort((a, b) => a.sortKey - b.sortKey);
  }, [allUsersForStats]);

  const totalActiveRate = useMemo(() => {
    if (allUsersForStats.length === 0) return 0;
    const activeCount = allUsersForStats.filter((u) => u.status === "1").length;
    return Math.round((activeCount / allUsersForStats.length) * 100);
  }, [allUsersForStats]);

  const genderData = [
    { name: "Male", value: data.genderStats.male || 0 },
    { name: "Female", value: data.genderStats.female || 0 },
    { name: "Not Specified", value: data.genderStats.notSpecified || 0 },
  ];

  const COLORS = ["#7a49e5", "#ff6bb1", "#e0d4ff"];

  return (
    <div className="art-admin-page">
      <div className="breadcrumbs-bar">
        <div className="breadcrumbs-content">
          <span className="back-link-purple" onClick={() => navigate("/")}>
            Home
          </span>
          <span style={{ color: "#6E7485", margin: "0 1px" }}>/</span>
          <span style={{ color: "#1D2026" }}>Admin Dashboard</span>
        </div>
      </div>

      <Container className="py-4">
        <Row className="g-3 mb-4">
          <Col md={6}>
            <div className="art-card-minimal shadow-sm border-0">
              <small className="art-label">Total Database Users</small>
              <h2 className="fw-light m-0">{data.pager?.total_items || 0}</h2>
              <div className="tiny text-muted mt-1">
                Total synchronized records
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="art-card-minimal shadow-sm border-0 border-start border-success border-3">
              <small className="art-label">Global Account Integrity</small>
              <h2 className="fw-light text-success m-0">
                {totalActiveRate}% Active
              </h2>
              <div className="tiny text-muted mt-1">
                Calculated from total database
              </div>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col lg={4}>
            <div className="art-card-minimal shadow-sm h-100">
              <h6 className="fw-normal mb-4 tiny-header">Gender Ratio</h6>
              <div style={{ width: "100%", height: 160 }}>
                <ResponsiveContainer
                  key={genderData.reduce((a, b) => a + b.value, 0)}
                >
                  <PieChart>
                    <Pie
                      data={genderData}
                      innerRadius={55}
                      outerRadius={70}
                      dataKey="value"
                      paddingAngle={4}
                    >
                      {genderData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className="d-flex justify-content-center gap-4 mt-3"
                style={{ fontSize: "11px", opacity: 0.8 }}
              >
                <span className="d-flex align-items-center">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: COLORS[0] }}
                  ></span>
                  <span className="fw-bold">Male: {data.genderStats.male}</span>
                </span>
                <span className="d-flex align-items-center">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: COLORS[1] }}
                  ></span>
                  <span className="fw-bold">
                    Female: {data.genderStats.female}
                  </span>
                </span>
              </div>
            </div>
          </Col>

          <Col lg={8}>
            <div className="art-card-minimal shadow-sm h-100">
              <h6 className="fw-normal mb-4 tiny-header">
                Overall Registration Timeline
              </h6>
              <div style={{ width: "100%", height: 180 }}>
                <ResponsiveContainer key={lineChartData.length}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f5f5f5"
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#999" }}
                    />
                    <YAxis
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#999" }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#7a49e5"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#7a49e5" }}
                      activeDot={{ r: 5 }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mb-3 px-1">
          <h6
            className="fw-normal m-0"
            style={{
              letterSpacing: "0.5px",
              color: "#1D2026",
              fontWeight: "500",
            }}
          >
            Community Overview
          </h6>
          <input
            type="text"
            className="art-search-input"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
          />
        </div>

        <div className="art-list-wrapper shadow-sm border-0">
          <div className="list-header row m-0 px-4 py-3 bg-light border-bottom d-none d-md-flex">
            <div className="col-5">
              <span className="tiny-header">Contributor</span>
            </div>
            <div className="col-4">
              <span className="tiny-header">Contact</span>
            </div>
            <div className="col-1 text-center">
              <span className="tiny-header">Joined</span>
            </div>
            <div className="col-2 text-end">
              <span className="tiny-header">Status</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner
                animation="border"
                variant="primary"
                className="custom-loading-spinner"
              />
            </div>
          ) : (
            data.users.map((user) => (
              <div
                key={user.uid}
                className="list-item row m-0 align-items-center"
              >
                <div className="col-12 col-md-5 d-flex align-items-center gap-3">
                  <div className="art-avatar">
                    <img
                      src={
                        user.userImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullName
                        )}&background=f8f9fa&color=7a49e5`
                      }
                      alt=""
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullName
                        )}&background=f8f9fa&color=7a49e5`;
                      }}
                    />
                  </div>
                  <div className="text-truncate">
                    <div className="fw-normal small text-dark">
                      {user.fullName}
                    </div>
                    <div
                      className="tiny text-muted"
                      style={{ fontSize: "10px" }}
                    >
                      @{user.name}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 tiny text-muted text-truncate fw-light">
                  {user.mail}
                </div>
                <div className="col-md-1 text-center tiny text-muted fw-light">
                  {user.displayDate}
                </div>
                <div className="col-md-2 text-end">
                  <span
                    className={`art-status-dot ${
                      user.status === "1" ? "active" : "locked"
                    }`}
                  ></span>
                  <span className="tiny text-muted">
                    {user.status === "1" ? "Active" : "Blocked"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && data.pager?.total_pages > 1 && (
          <div className="art-pagination-wrapper">
            <div className="art-pagination-center">
              {[...Array(data.pager.total_pages)].map((_, i) => (
                <button
                  key={i}
                  className={`art-pagi-btn ${i === page ? "active" : ""}`}
                  onClick={() => {
                    setPage(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
