package de.messetat.bookface.core.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.engine.EngineConstants;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = Filter.class,
           property = {
                   Constants.SERVICE_DESCRIPTION + "=Demo to filter incoming requests",
                   EngineConstants.SLING_FILTER_SCOPE + "=" + EngineConstants.FILTER_SCOPE_REQUEST,
                   Constants.SERVICE_RANKING + ":Integer=-700"

           })
public class I19nLocaleFilter implements Filter {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response,
                         final FilterChain filterChain) throws IOException, ServletException {

        final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;
        logger.debug("request for {}, with selector {}", slingRequest
                .getRequestPathInfo().getResourcePath(), slingRequest
                .getRequestPathInfo().getSelectorString());

        filterChain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }

}